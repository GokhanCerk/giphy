import React from "react";
import styles from "./Giflist.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import lazy_image from "../UI/assets/lazy_image.png";

const GifList = ({ gifs }) => {
  return (
    <div className={styles.container}>
      {gifs.map((item) => (
        <LazyLoadImage
          effect="blur"
          src={item.images.downsized_medium.url}
          alt={item.title}
          key={Math.random()}
          height="480px"
          width="480px"
          placeholderSrc={lazy_image}
        />
      ))}
    </div>
  );
};

export default React.memo(GifList);
