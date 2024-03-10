# Image Captioning for Remote Sensing Data

## Approach

- Found and compared models on HuggingFace and selected 2 models for finetuning:
    - [`nlpconnect/vit-gpt2-image-captioning`](https://huggingface.co/nlpconnect/vit-gpt2-image-captioning)
    - [`Salesforce/blip-image-captioning-base`](https://huggingface.co/Salesforce/blip-image-captioning-base)

- Finetuned both on the dataset (splits used for this were **train** and **valid** for training and evaluation purposes)
- Tested them on the **test** split and further tuned the training parameters
- Tested BLEU score for these models ("valid" split used):
    - Base models:
        - nlpconnect/vit-gpt2-image-captioning: 0.58
        - Salesforce/blip-image-captioning-base: 0.51

    - Finetuned (best):
        - nlpconnect/vit-gpt2-image-captioning: 0.55
        - Salesforce/blip-image-captioning-base: 0.56

- Code Explained:
    - General:
        - Used [`rsicd`](https://huggingface.co/datasets/arampacha/rsicd) dataset from HuggingFace
        - learning_rate = 5e-7 is the best for this purpose as it allows the model to understand the mapping properly, but takes a long time to train the model (higher no. of epochs required for effective training of model)
        - **AdamW** optimizer used due to it's inherent advantage of effectively optimizing the model based on the training metrics and loss
        - **ReduceLROnPlateau** scheduler used to prevent overfitting (reduces learning_rate when the validation loss plateaus)
        - num_epochs = 5
        - Custom Dataset classes were defined to retrieve data during training
    - [`trinit-hackathon-blip-training.ipynb`](https://github.com/gurveervirk/TRINIT-Prometheans-ML/blob/main/training/trinit-hackathon-blip-training.ipynb):
        - Used [`accelerate`](https://huggingface.co/docs/accelerate/en/index) from HuggingFace to optimize training. This allowed us to utilize all of the GPU's memory and compute capability. Dropped training time / epoch from 4 hours to 1 hour (Distributed / MultiGPU)
        - Used **notebook_launcher** to launch the training function
    - [`trinit-hackathon-vit-training.ipynb`](https://github.com/gurveervirk/TRINIT-Prometheans-ML/blob/main/training/trinit-hackathon-vit-training.ipynb):
        - Used [`trainer`](https://huggingface.co/docs/transformers/main_classes/trainer) from HuggingFace to optimize training. It is an excellent utility function that very effectively optimizes the training (2.5 hrs for 5 epochs compared to 5 hrs for BLIP), allowing for extensive customization
        - Used **Seq2SeqTrainer** and related functions from trainer to train the model

- Conclusion:
    - BLIP model was found to be able to capture context better than ViT due to the scores and was also able to generate short and crisp captions which ViT was not able to sometimes
    - ViT was much faster to train comparatively, half the time required (2.5 hours to 5 hours)
    - AdamW optimizer, ReduceLROnPlateau scheduler were found to be the best with learning rate = 5e-7, albeit slow, was able to better train the model

## Video Demos:

- [`Combined Video`](https://drive.google.com/file/d/1DHO_ek6zn2u86l4WRYvZ5I0N8--bQNrn/view)
- Individual Videos:
    - [`Model Training Approach`](https://drive.google.com/file/d/1db2b6i9j7Wlbq7zl5nATT0_TlTeHl5mb/view?usp=sharing)
    - [`Website integrated model`](https://drive.google.com/file/d/1tDcs57KPvCCVgJS1L2XMhpj6UXomFKuv/view?usp=drive_link)

## Miscellaneous
- Model Links:
    - [`ViT finetuned`](https://www.kaggle.com/datasets/gurveersinghvirk/clip-gpt2-rsicd-finetuned-5-epochs)
    - [`BLIP finetuned`](https://huggingface.co/Gurveer05/blip-image-captioning-base-rscid-finetuned/)

- Kaggle Notebook Links:
    - [`Training`](https://www.kaggle.com/code/gurveersinghvirk/trinit-hackathon/)
    - [`Testing`](https://www.kaggle.com/code/gurveersinghvirk/trinit-hackathon-testing/)
