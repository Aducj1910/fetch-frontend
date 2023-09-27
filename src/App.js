import logo from "./logo.svg";
import "./index.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {
  //this state stores a list of breeds
  const [breeds, setBreeds] = useState([]);

  //this state has the selected values (current breeds selected)
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  //this state consists a list of images fetched
  const [images, setImages] = useState([]);

  //contains current images to display
  const [currImages, setCurrImages] = useState([]);

  //this state keeps track of all the breeds whose images have already been called
  //to avoid extra API calls from taking place
  const [breedsCalled, setBreedsCalled] = useState({});

  //calling the API to get a list of all dog breeds and sub-breeds
  //using the useEffect hook on first render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Error calling the API");
        } else {
          const data = await response.json();
          const breedMessage = data.message;

          const breedData = [];

          //for every breed in the list, we will add it to the list of breeds
          //we will also add every sub-breed to the list (along with the original)

          Object.keys(breedMessage).forEach((bm) => {
            //adding the main breed data to breedData
            let breedObject = {
              id: bm,
              //title-izes the breed name
              title: bm.charAt(0).toUpperCase() + bm.substring(1).toLowerCase(),
            };

            breedData.push(breedObject);

            //now, we check for any sub-breeds
            //iterating through the sub-breeds in this specific breed
            breedMessage[bm].forEach((subBreed) => {
              let breedObject = {
                id: bm + "-" + subBreed,
                //this converts the breed name into title text with the sub-breed name before the main breed (as is convention)
                title:
                  subBreed.charAt(0).toUpperCase() +
                  subBreed.substring(1).toLowerCase() +
                  " " +
                  bm.charAt(0).toUpperCase() +
                  bm.substring(1).toLowerCase(),
              };

              breedData.push(breedObject);
            });
          });

          setBreeds(breedData);
        }
      } catch (error) {
        window.alert("ERROR CALLING THE API");
      }
    };

    //calling fetchData
    fetchData();
  }, []);

  //using the useEffect hook to detect changes in selected breeds to recall images
  useEffect(() => {
    //the fetch is called every time the options are changed because
    //even if the breed has been called and cached before, the images might change based on the server
    //updating the images for that specific breed
    const fetchData = async () => {
      let locImagesState = JSON.parse(JSON.stringify(images));

      for (const breed of selectedBreeds) {
        if (
          breedsCalled[breed.id] == undefined &&
          breedsCalled[breed.id.split("-")[breed.id.split("-1").length - 1]] ==
            undefined
        ) {
          try {
            let innerAPIText = breed.id.split("-").join("/");

            const response = await fetch(
              `https://dog.ceo/api/breed/${innerAPIText}/images`
            );
            if (!response.ok) {
              throw new Error("Error calling the API");
            } else {
              const data = await response.json();
              const resImages = data.message;

              let tempBreedsCalled = JSON.parse(JSON.stringify(breedsCalled));
              tempBreedsCalled[breed.id] = true;

              setBreedsCalled(JSON.parse(JSON.stringify(tempBreedsCalled)));

              let locImages = [];

              resImages.forEach((ri) => {
                locImages.push({
                  url: ri,
                  breed: ri.split("/")[ri.split("/").length - 2],
                });
              });

              let tempImages = JSON.parse(JSON.stringify(images));
              locImages.forEach((li) => {
                tempImages.push(li);
              });

              locImagesState = tempImages;

              setImages(JSON.parse(JSON.stringify(tempImages)));
            }
          } catch (error) {
            window.alert("ERROR CALLING API");
          }
        }
      }

      let tempImages = JSON.parse(JSON.stringify(locImagesState));
      console.log(tempImages);
      let tempCurrImages = [];

      for (const timg of tempImages) {
        for (const breed of selectedBreeds) {
          console.log(breed);
          if (breed.id == timg.breed || breed.id == timg.breed.split("-")[0]) {
            tempCurrImages.push(timg);
          }
        }
      }

      setCurrImages(JSON.parse(JSON.stringify(tempCurrImages)));
    };

    fetchData();
  }, [selectedBreeds]);

  return (
    <Home
      breeds={breeds}
      selected={selectedBreeds}
      setSelected={setSelectedBreeds}
      images={images}
      currImages={currImages}
    />
  );
}

export default App;
