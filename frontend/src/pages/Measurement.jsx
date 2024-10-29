import React, { useEffect, useState } from 'react'
import instance from '../axios';


const Measurement = () => {
	const [gender, setGender] = useState("male");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [image, setImage] = useState(null);
	const [imagePath, setImagePath] = useState("");

	// imagePath 상태가 업데이트될 때마다 콘솔에 로그 출력
	useEffect(() => {
		if (imagePath) {
			console.log("imagePath", imagePath);
		}
	}, [imagePath]);

	// 성별 선택 시 호출되는 핸들러
	const handleGenderChange = (e) => {
		setGender(e.target.value);
	};

	// 이미지 파일 선택 시 호출되는 핸들러
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	}

	// 폼 제출(next 버튼을 클릭) 시 호출되는 핸들러
	const handleSubmit = async (e) => {
		e.preventDefault();

		// FormData 객체 생성 : FormData 는 key, value 형식으로 되어있는 객체
		const formData = new FormData();  // formData.append('key', value);
		formData.append("gender", gender);
		formData.append("height", height);
		formData.append("weight", weight);
		formData.append("image", image);

		try {
			// 서버로 formData 전송
			const res = await instance.post("/measurement", formData, {
				headers: { "Content-Type": "multipart/form-data" }  // 요청 헤더 설정
				// 요청 본문에 포함된 데이터의 형식을 지정
				// multipart/form-data : 파일 업로드와 같은 복합 데이터 형식을 전송하기 위해 사용되는 콘텐츠 타입, 텍스트 필드와 파일 데이터를 모두 포함할 수 있도록 설계되어 있음.
			});
			setImagePath(res.data.imagePath);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div style={styles.container}>
			<h1>CloOn</h1>
			<div style={styles.formContainer}>
				<div style={styles.silhouette}>
					{imagePath && (
						<img src={`http://localhost:3007/uploads/${imagePath.split('/')[1]}`} alt="Uploaded" />
					)}
				</div>
				<form style={styles.form} onSubmit={handleSubmit}>
					<div>
						<label>
							성별:
							<input
								type="radio"
								value="male"
								checked={gender === "male"}
								onChange={handleGenderChange}
							/>{" "}
							남자
							<input
								type="radio"
								value="female"
								checked={gender === "female"}
								onChange={handleGenderChange}
							/>{" "}
							여자
						</label>
					</div>
					<div>
						<label>
							신장:{" "}
							<input
								type="number"
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								placeholder="cm"
								required
							/>{" "}
							cm
						</label>
					</div>
					<div>
						<label>
							체중:{" "}
							<input
								type="number"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								placeholder="kg"
								required
							/>{" "}
							kg
						</label>
					</div>
					<div>
						<label>
							이미지 업로드: {" "}
							<input type="file" onChange={handleImageChange} required />
						</label>
					</div>
					<button type="submit">next</button>
				</form>
			</div>
		</div>
	);
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "20px",
		fontFamily: "Arial, sans-serif",
	},
	formContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "600px",
		marginTop: "20px",
	},
	silhouette: {
		width: "150px",
		height: "300px",
		backgroundColor: "black",
		borderRadius: "50%",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
	},
};

export default Measurement

