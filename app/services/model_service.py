# # app/services/model_service.py
# import joblib

# # 모델 로드 함수
# def load_model():
#     return joblib.load("model/model_file.pkl")  # 경로는 모델 파일 위치에 맞게 설정

# # 예측 함수
# def predict(model, data):
#     # 데이터 전처리 로직 추가 가능
#     prediction = model.predict([data])  # 데이터는 리스트 형식으로 전달
#     return prediction[0]


# ---------------------------------------------------------------------GPU

# import torch

# # GPU가 있는 경우 "cuda"를 사용하고, 없는 경우 "cpu"를 사용
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# def load_model():
#     model = torch.load("model/model_file.pth", map_location=device)
#     model = model.to(device)  # GPU 또는 CPU 할당
#     model.eval()
#     return model

# def predict(model, data):
#     data = data.to(device)  # 데이터도 GPU/CPU에 맞게 할당
#     with torch.no_grad():
#         prediction = model(data)
#     return prediction.cpu().numpy()  # 예측 후 CPU로 결과 반환



