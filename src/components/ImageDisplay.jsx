import { Card, Grid, Button } from "@mui/joy";
import React, { Component, useState, useRef, useEffect } from "react";

const ImageDisplay = (props) => {
  const { images, selected, currImages } = props;

  //number of images to show
  const [visibleImages, setVisibleImages] = useState(20);
  const [loadMoreImages, setLoadMoreImages] = useState(20);

  const loadMore = () => {
    setVisibleImages(visibleImages + loadMoreImages);
  };

  //using a ref to create a trigger for infinite scroll
  const loadMoreTrigger = useRef(null);

  //this useeffect hook looks for until the loaded images are exhausted
  //then loads more images
  useEffect(() => {
    //this observer can tell us when a target element enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        //loads more images if at the bottom of the page and there are more images to load
        if (entry.isIntersecting && visibleImages < currImages.length) {
          loadMore();
        }
      },
      {
        //makes sure it only triggers when element is fully in view
        threshold: 1,
      }
    );

    if (loadMoreTrigger.current) {
      observer.observe(loadMoreTrigger.current);
    }

    return () => {
      if (loadMoreTrigger.current) {
        observer.unobserve(loadMoreTrigger.current);
      }
    };
  }, [visibleImages, currImages.length]);

  return (
    <div>
      <Grid container gap={1}>
        {currImages.slice(0, visibleImages).map((img) => (
          <Grid item lg={2.3} md={3.8} xs={5.8} key={img.id}>
            <Card style={{ height: "100%" }}>
              <div className="relative group">
                <img
                  src={img.url}
                  loading="lazy"
                  alt=""
                  className="w-full h-auto max-h-48"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex justify-center items-center pointer-events-none">
                  <p className="text-white">
                    {img.breed.split("-")[0].charAt(0).toUpperCase() +
                      img.breed.split("-")[0].substring(1)}
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      {visibleImages < currImages.length && (
        <div ref={loadMoreTrigger}>
          <Button
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              marginTop: "10px",
              height: "100px",
            }}
          >
            Loading...
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
