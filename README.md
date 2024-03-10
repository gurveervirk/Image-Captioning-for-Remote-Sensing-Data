# Image Captioning for Remote Sensing Data

## Approach

- Found and compared models on HuggingFace and selected 2 models for finetuning:
    - [`nlpconnect/vit-gpt2-image-captioning`](https://huggingface.co/nlpconnect/vit-gpt2-image-captioning)
    - [`Salesforce/blip-image-captioning-base`](https://huggingface.co/Salesforce/blip-image-captioning-base)

- Finetuned both on the dataset (splits used for this were "train" and "valid" for training and evaluation purposes)
- Tested them on the "test" split and further tuned the training parameters
- Tested BLEU score for these models ("valid" split used):
    - Base models:
        - nlpconnect/vit-gpt2-image-captioning: 0.58
        - Salesforce/blip-image-captioning-base: 0.51

    - Finetuned (best):
        - nlpconnect/vit-gpt2-image-captioning: 0.55
        - Salesforce/blip-image-captioning-base: 0.56

- Conclusion:
    - BLIP model was found to be able to capture context better than ViT due to the scores and was also able to generate short and crisp captions which ViT was not able to sometimes
    - ViT was much faster to train comparatively, half the time required (2.5 hours to 5 hours)
    - AdamW optimizer, ReduceLROnPlateau scheduler were found to be the best with learning rate = 5e-7, albeit slow, was able to better train the model

- Video Demos:
    - [`Website integrated model`](https://drive.google.com/file/d/1tDcs57KPvCCVgJS1L2XMhpj6UXomFKuv/view?usp=drive_link)
    - [`Model Training Approach`](https://drive.google.com/file/d/1db2b6i9j7Wlbq7zl5nATT0_TlTeHl5mb/view?usp=sharing)

- Model Links:
    - [`ViT finetuned`](https://www.kaggle.com/datasets/gurveersinghvirk/clip-gpt2-rsicd-finetuned-5-epochs)
    - [`BLIP finetuned`](https://huggingface.co/Gurveer05/blip-image-captioning-base-rscid-finetuned/)

- Kaggle Notebook Links:
    - [`Training`](https://www.kaggle.com/code/gurveersinghvirk/trinit-hackathon/)
    - [`Testing`](https://www.kaggle.com/code/gurveersinghvirk/trinit-hackathon-testing/)
