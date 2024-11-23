# # app/routes/model_route.py
# from fastapi import APIRouter
# from app.schemas import PredictRequest, PredictResponse
# from app.services.model_service import load_model, predict

# router = APIRouter()

# # 모델 로드
# model = load_model()

# # 예측 엔드포인트
# @router.post("/predict", response_model=PredictResponse)
# def predict_endpoint(request: PredictRequest):
#     prediction = predict(model, request.data)
#     return {"prediction": prediction}
