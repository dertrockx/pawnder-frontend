import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Image, IconButton, Icon } from "@chakra-ui/react";
import { IoPencil, IoCloudUpload, IoTrash } from "react-icons/io5";
import styles from "./style.module.css";
function EditableImage({
	photo,
	loading = false,
	handleUpdate = () => {},
	handleDelete = () => {},
	noDelete = false,
}) {
	const { petId } = useSelector((s) => s.pet);
	const { url = "https://bit.ly/sage-adebayo" } = photo;

	const fileRef = useRef();
	function handleClick() {
		fileRef.current.click();
	}
	async function onFileCapture(e) {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("photo", e.target.files[0]);
		formData.append("petId", petId);
		console.log(...formData);
		handleUpdate(photo.id, formData);
	}

	return (
		<div className={styles.imageContainer}>
			<div className={styles.imageOverlay} />
			<Image boxSize="230px" objectFit="cover" src={url} alt="Segun Adebayo" />
			<div className={styles.customButton}>
				<IconButton
					size="lg"
					isRound
					icon={<Icon as={IoPencil} />}
					aria-label="Change photo"
					colorScheme="orange"
					onClick={handleClick}
					isLoading={loading}
				/>
				{!noDelete && (
					<IconButton
						size="lg"
						isRound
						icon={<Icon as={IoTrash} />}
						aria-label="Delete Photo"
						colorScheme="red"
						isLoading={loading}
						onClick={() => handleDelete(photo.id)}
					/>
				)}
			</div>

			<input
				type="file"
				accept="image/*"
				ref={fileRef}
				onChangeCapture={onFileCapture}
				hidden
				disabled={loading}
			/>
		</div>
	);
}
export function ImagePlaceholder({ handleUpload = () => {}, loading = false }) {
	const { petId } = useSelector((s) => s.pet);
	const fileRef = useRef();
	function handleClick() {
		fileRef.current.click();
	}
	async function onFileCapture(e) {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("photo", e.target.files[0]);
		formData.append("petId", petId);
		console.log(...formData);
		handleUpload(formData);
	}
	return (
		<div
			className={styles.imageContainer}
			style={{ height: "230px", width: "230px", border: "1px dotted black" }}
		>
			<IconButton
				isRound
				size="lg"
				className={styles.customButton}
				icon={<Icon as={IoCloudUpload} />}
				aria-label="Add new photo"
				colorScheme="green"
				onClick={handleClick}
				isLoading={loading}
			/>
			<input
				type="file"
				accept="image/*"
				ref={fileRef}
				onChangeCapture={onFileCapture}
				hidden
				disabled={loading}
			/>
		</div>
	);
}

export default EditableImage;
