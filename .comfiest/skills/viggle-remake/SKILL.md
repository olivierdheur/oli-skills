---
name: viggle-remake
description: Viggle Remake in Comfiest — H3 LoRA pair for recasting and editing clips, one to four painted frames, source motion/camera/audio preserved, 480p on 24 GB.
---

# Viggle Remake — recast and edit a clip

Operating rules live in `../SKILL.md`; the H3 family is in `../minimaxh3/SKILL.md`. Viggle Remake is
**not a new checkpoint**: it is a rank-256 LoRA pair on the MiniMax-H3 base `transformer`. `swap`
recasts people/characters; `edit` removes, inserts or swaps objects and changes setting, weather or light.
It re-renders a clip window with the source's motion, camera, framing and **soundtrack**, driven by one
to four **painted frames** plus a six-section H3 prompt.

The public graphs use the existing H3 `fl2va` pruned int8 base, so no new checkpoint is needed — only
the two 3.5 GiB LoRAs and the node pack.

## Files

Files live in `../../workflows/viggle-remake/`.

| File | Mode | Format | Nodes | Save prefix |
| - | - | - | - | - |
| `viggle-remake-swap.json` | swap | UI | 19 | `COMFY_WORKFLOWS/VIGGLE_SWAP` |
| `api/viggle-remake-swap.api.json` | swap | API | 19 | `COMFY_WORKFLOWS/VIGGLE_SWAP` |
| `viggle-remake-edit.json` | edit | UI | 19 | `COMFY_WORKFLOWS/VIGGLE_EDIT` |
| `api/viggle-remake-edit.api.json` | edit | API | 19 | `COMFY_WORKFLOWS/VIGGLE_EDIT` |

The UI files are for ComfyUI; the API files are the agent/MCP path. The source graphs were verified
before sanitization; the public copies were conversion-validated and statically validated, not
re-rendered end-to-end.

## Requirements

- **ComfyUI 0.45.0 or newer.**
- **`ComfyUI-Viggle-Remake`** — an Apache-2.0 node pack from the `comfyui/` folder of
  [`Viggle/Viggle-Remake`](https://huggingface.co/Viggle/Viggle-Remake). It is not on the Comfy
  Registry and must not be git-cloned (the repo is ~210 GB). `scripts/install_nodes.py` downloads only
  its two Python files into `custom_nodes/ComfyUI-Viggle-Remake`; restart ComfyUI after installing.
- `LoraLoaderBypassModelOnly` is **core** (`comfy_extras.nodes_lora_debug`). Use it, not
  `LoraLoaderModelOnly`: the merge path rounds at bf16 and loses 27–63% of the update.
- No pip dependencies.

## Models

| Role | File | Size |
| - | - | - |
| swap LoRA | `minimax/viggle_remake_swap_comfyui.safetensors` | 3.8 GB |
| edit LoRA | `minimax/viggle_remake_edit_comfyui.safetensors` | 3.8 GB |
| base | `minimax/minimax_h3_fl2va_pruned_int8_convrot.safetensors` | existing H3 |
| text encoder | `qwen3vl_32b_minimax_h3_int8_convrot.safetensors` (`minimax`) | existing H3 |
| video / audio VAE | `minimax/minimax_h3_video_vae_fp16.safetensors`, `minimax/minimax_h3_audio_vae_fp32.safetensors` | existing H3 |

Use the **fl2va** base, not `ref2va`; the LoRAs apply to the base transformer. The low-rank LoRAs
(rank 128/64) are upstream alternatives and are not in the manifest. `--only viggle` fetches the two
LoRAs; add `h3` for the shared base/VAEs/encoder (`--only h3,viggle`).

## Graph

```text
UNETLoader(fl2va pruned int8) -> LoraLoaderBypassModelOnly(swap|edit, 1.0)
  -> RemakeKeyframeUntil(0.9) -> BasicGuider
LoadVideo -> GetVideoComponents ─┐
LoadImage(ref_1) ────────────────┼-> RemakeConditioning -> BasicGuider + RemakeNoise
CLIPLoader, VAELoader x2 ────────┘                    -> latent_image
KSamplerSelect(euler) + ManualSigmas -> SamplerCustomAdvanced
  -> VAEDecode + VAEDecodeAudio -> CreateVideo(24 fps) -> SaveVideo
```

What the four node types add over stock H3: the source clip as `<Video 1>` with text-only
presentation, each painted frame as `<Picture N>` **and** a keyframe at a real output frame, the
soundtrack encoded as clean target audio (`noise_mask 0`) so it is carried rather than generated, and
the seed's noise drawn in the reference sampler's order.

| | swap | edit |
| - | - | - |
| LoRA | `viggle_remake_swap_comfyui.safetensors` | `viggle_remake_edit_comfyui.safetensors` |
| `ManualSigmas` | `1.0, 0.990476, 0.965243, 0.923077, 0.8, 0.631579, 0.0` | `1.0, 0.983607, 0.96, 0.923077, 0.857143, 0.705882, 0.0` |
| public `pins` | `12` | empty |
| public `frames` / `short_edge` | 124 / 480 | 124 / 480 |

## Inputs

**Source clip.** 24 fps, `17n+5` frames (90–345; the public graphs use **124**), at least `frames`
long, and already at the canvas you want. `short_edge=480` gives 480×864 for 9:16 or 864×480 for
16:9; a source that already fits keeps its own size. Frames not on the canvas are rescaled and
centre-cropped. Generate the source at the target canvas; a 1280×736 source needs `short_edge=736`,
which does **not** fit the 24 GB pruned-int8 + LoRA stack.

**Painted frame(s).** One to four `LoadImage` references, addressed `<Picture 1>` … `<Picture 4>`.
Paint the reference from a frame of the source with H3-Image edit (`../h3-image/SKILL.md`, 1-ref
graph), or any editor. The painted frame decides identity and look; a pin fixes its composition at
that output frame.

**Pins.** Empty, or exactly one pin per reference. `12` means the reference is pinned to frame 12.
Pin when composition matters; leave empty to test the LoRA alone.

**Prompt.** MiniMax-H3 six-section format; the model requires it. Replace the public scene/subject
details with the actual clip. Timestamps must fit `frames / 24` seconds (5.167 s at 124).

```text
subject_definitions:
<Video 1> is the source video: [shot, subject, action, camera, setting, light].
<Picture 1> is a painted frame of the target video at about 00:00.500.
<Subject 1> is [the target identity/costume in <Picture 1>]. It replaces [the source subject].

summary:
[video editing + character replacement] [What changes and what stays.]

retention_analysis:
<Video 1> (source video editing): fully_preserved - [shot, camera, motion, timing, setting, light, audio].
<Picture 1> (appears in [Shot 1]): reference - [identity, costume, materials taken from it].
<Subject 1> (appears in [Shot 1]): fully_preserved - [what stays identical].

detailed_description:
[Shot 1] From 00:00.000 to 00:05.167 [the finished action, contact, motion, background and light].
No text is added anywhere; existing signs stay as they are in <Video 1>.

overall_soundscape:
The source soundtrack continues throughout: [rain, traffic, footsteps, ambience].

non_diegetic_music:
N/A
```

For `edit`, add `<Subject 2>` and use `removed`, `partially_preserved` or `attribute_transfer` in
`retention_analysis`. The source is one continuous shot per render; split multi-shot clips at cuts.

## Results (RTX 4090 24 GB, 480×864, 124 f, 24 fps, seed 0)

| Run | Wall | Bytes | PSNR full / ring | Flow src→out | Laplacian |
| - | - | - | - | - | - |
| swap, pinned f12 | 130.9 s | 2,648,438 | 12.35 / 18.86 dB | 0.923 → 0.808 | 199.5 → 656.0 |
| edit, umbrella removed | 122.5 s | 1,901,911 | 15.05 / 18.32 dB | 0.923 → 0.852 | 199.5 → 192.8 |

- **Runs on the pruned int8 base** at 480p, ~2 min per 124-frame window at 6 forwards.
- **Soundtrack is carried, not generated:** corr 0.9762 at lag 0 (swap) and 0.9758 (edit).
- **Swap adds detail; edit protects it:** Laplacian 199.5 → 656.0 (chrome robot) vs 199.5 → 192.8
  (umbrella removed).
- **Motion survives:** median flow 0.92 → 0.81–0.85 px/frame at half res.
- Ring PSNR ~18 dB in both: the background is re-synthesised, so judge the look, not the dB.

## Production guidance

- **480p is the 24 GB setting, not 480p-with-headroom.** Use it for the window, then upscale with
  ReCaVSR X4 (`../recavsr/SKILL.md`) or RelayVSR X2 (`../relayvsr/SKILL.md`).
- **`swap` for characters; `edit` for everything else.** Umbrella/object removal under `edit` leaves
  the subject and sharpness untouched; character replacement under `swap` is what moves the image.
- **One painted ref is the tested path.** Multi-reference (2–4) is supported by the node but was not
  tested; one ref per window is the safe production default.
- **`RemakePrefix` is untested.** It is for hopping the previous take's last frames into the next
  window for clips longer than 345 frames; split at cuts for now.
- **One window per render.** The public graphs render 124 frames (5.17 s); split longer clips at cuts
  and join afterwards, preserving the soundtrack.

## Gotchas

- **Restart ComfyUI after installing the node pack.** Nothing else registers it. `POST /manager/reboot`
  may time out while the process restarts; poll `/system_stats`.
- **`/interrupt` and `/free` do not clear a wedged job.** Check `/system_stats` `vram_free` before a
  heavy run; only a reboot cleared a stuck dynamic-VRAM load in testing.
- **1280×736 does not fit** with the pruned int8 base + 3.8 GB LoRA branch. The same swap graph ran
  >50 min at 736 vs 131 s at 480. Stay at 480.
- **ComfyUI caches identical inputs.** Change the seed for a real repeat.
- **`fetch_outputs` may fail.** Use `/history/<prompt_id>` + `/view`, or `scripts/fetch_output.py`.
- **`/history` can time out while a 20 GB checkpoint loads.** Retry with a longer socket timeout.
- **9:16 at `short_edge 480` is 480×864**, not 480×832, when the source already fits. Generate the
  source at the canvas you actually want.
- **Use your own source clip.** Viggle's examples are third-party footage; the public graph uses
  `example.mp4`.
- **A silent source gives a silent result.** The soundtrack is carried, not generated.
- **The VLM is unreliable on this footage.** Judge identity on faces and a labelled sheet, not a
  one-line caption.

## Verify before production

```bash
python scripts/validate_workflow.py workflows/viggle-remake/api/viggle-remake-swap.api.json \
  --url http://<host>:<port>
python scripts/validate_workflow.py workflows/viggle-remake/api/viggle-remake-edit.api.json \
  --url http://<host>:<port>
comfy run --workflow workflows/viggle-remake/viggle-remake-swap.json --print-prompt \
  --host <host> --port <port>
```

Check `/object_info/RemakeConditioning`, `/object_info/RemakeNoise`,
`/object_info/RemakeKeyframeUntil`, and `/object_info/LoraLoaderBypassModelOnly`. Confirm the source is
24 fps and at least 124 frames before submitting.
