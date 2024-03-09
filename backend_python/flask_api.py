from flask import Flask, request, jsonify
import torch
from transformers import BlipForConditionalGeneration, AutoProcessor
from PIL import Image
import numpy as np

app = Flask(__name__)

device = "cpu"
model = BlipForConditionalGeneration.from_pretrained("archive")
processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")

@app.route('/caption', methods=['POST'])
def generate_caption():
    # Expect the image path in the request body
    data = request.get_json()
    if 'imagePath' not in data:
        return jsonify({"error": "Image path is required"}), 400

    image_path = data['imagePath']
    try:
        image = Image.open(image_path)
    except Exception as e:
        return jsonify({"error": f"Failed to open image: {e}"}), 400

    inputs = processor(images=image, return_tensors="np")
    pixel_values = inputs.pixel_values

    pixel_values_tensor = torch.from_numpy(pixel_values).to(device)
    if len(pixel_values_tensor.shape) == 3:
        pixel_values_tensor = pixel_values_tensor.unsqueeze(0)

    generated_ids = model.generate(pixel_values=pixel_values_tensor, max_length=50)
    generated_caption = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

    return jsonify({"caption": generated_caption})

if __name__ == '__main__':
    app.run(port=9000)
