/**
 * @animalType the animalType returned from the server
 */
export default function mapper(animalType) {
	let type = "";
	switch (animalType) {
		case "cats":
			type = "Cat";
			break;
		case "fish and aquariums":
			type = "Fish and Aquariums";
			break;
		case "reptiles and amphibians":
			type = "Reptile/Amphibian";
			break;
		case "exotic pets":
			type = "Exotic Pet";
			break;
		case "rabbits":
			type = "Rabbit";
			break;
		case "rodents":
			type = "Rodent";
			break;
		default:
			type = "Dog";
			break;
	}

	return type;
}
