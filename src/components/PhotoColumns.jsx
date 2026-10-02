import React from "react";

const photos = Object.values(
  import.meta.glob("../assets/photos/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

function PhotoSet({ copy }) {
  return (
    <div className="photo-set" aria-hidden={copy === 1 ? "true" : undefined}>
      {photos.map((photo, index) => (
        <img
          key={`${copy}-${photo}-${index}`}
          src={photo}
          alt=""
          className="background-photo"
        />
      ))}
    </div>
  );
}

function PhotoColumn({ reverse, delay }) {
  return (
    <div className={`photo-column ${reverse ? "reverse" : ""}`}>
      <div
        className="photo-track"
        style={{
          "--animation-delay": `${delay}s`,
        }}
      >
        <PhotoSet copy={0} />
        <PhotoSet copy={1} />
      </div>
    </div>
  );
}

export default function PhotoColumns() {
  /*
    ALL columns have exactly the same speed.

    The delay determines where each column
    starts inside the same animation.

    25 photos
    75 second complete cycle

    Roughly:
    1 photo = 75 / 25 = 3 seconds
  */

  const columns = [
    { delay: 0 },    // Photo 1
    { delay: -33 },  // Photo 12
    { delay: -66 },  // Photo 23
    { delay: -24 },  // Photo 9
    { delay: -57 },  // Photo 20
    { delay: -15 },  // Photo 6
    { delay: -48 },  // Photo 17
    { delay: -6 },   // Photo 3
  ];

  return (
    <div className="photo-background">
      {columns.map((column, index) => (
        <PhotoColumn
          key={index}
          reverse={index % 2 !== 0}
          delay={column.delay}
        />
      ))}
    </div>
  );
}