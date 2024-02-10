from PIL import Image
from diffusers import StableDiffusionImg2ImgPipeline
import pytorch as torch

model_id_or_path = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id_or_path, torch_dtype=torch.float16)
pipe = pipe.to(cuda)

init_image = Image.open("mountains_image.jpeg").convert("RGB").resize((768, 512))
prompt = "A fantasy landscape, trending on artstation"

images = pipe(prompt=prompt, image=init_image, strength=0.75, guidance_scale=7.5).images
images[0].save("fantasy_landscape.png")

import { HfInference } from "@huggingface/inference";

const inference = new HfInference(HF_TOKEN);
await inference.imageToImage({
    data: await (await fetch("image")).blob(),
    model: "timbrooks/instruct-pix2pix",
    parameters: {
        prompt: "Deblur this image",
    },
});
