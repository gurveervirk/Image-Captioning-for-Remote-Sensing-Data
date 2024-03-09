import streamlit as st
import torch
from transformers import BlipForConditionalGeneration, AutoProcessor
from PIL import Image
import io
import numpy as np

st.title("Image Captioning with Blip Model")

device = "cpu"
model = BlipForConditionalGeneration.from_pretrained("archive")
processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")

uploaded_file = st.file_uploader("Choose an image...", type="jpg")

if uploaded_file is not None:
    st.image(uploaded_file, caption="Uploaded Image.", use_column_width=True)
    st.write("")
    st.write("Predicting...")

    image = Image.open(uploaded_file)

    inputs = processor(images=image, return_tensors="np")
    pixel_values = inputs.pixel_values

    pixel_values_tensor = torch.from_numpy(pixel_values).to(device)
    if len(pixel_values_tensor.shape) == 3:
        pixel_values_tensor = pixel_values_tensor.unsqueeze(0)

    generated_ids = model.generate(pixel_values=pixel_values_tensor, max_length=50)
    generated_caption = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

    st.write("Caption:")
    st.write(generated_caption)
