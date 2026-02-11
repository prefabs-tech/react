import React from "react";

import "./index.css";

interface IProperties {
  videoLink: string;
  videoToken: string;
  imageSource?: string;
  aspectRatio?: string;
  alt?: string;
}

const YoutubeFacade: React.FC<IProperties> = ({
  alt,
  aspectRatio,
  imageSource,
  videoLink,
  videoToken,
}) => {
  const VideoImageLink =
    imageSource || `https://img.youtube.com/vi/${videoToken}/mqdefault.jpg`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadYoutubeVideo = (event: any) => {
    event.preventDefault();

    const img = event.currentTarget.firstElementChild,
      iFrame = Object.assign(document.createElement("iframe"), {
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        className: "videoEmbed",
        frameborder: "0",
        src:
          "https://www.youtube.com/embed/" +
          event.currentTarget.dataset.youtubeVideoToken +
          "?autoplay=1",
        title: img.alt,
      });

    iFrame.style.aspectRatio = img.dataset.aspectRatio;

    event.currentTarget.parentNode.replaceWith(iFrame);
  };

  return (
    <div
      className="youTubeFacade"
      style={{
        background: `url(${VideoImageLink}) no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        aspectRatio: aspectRatio,
      }}
    >
      <div className="facade-thumbnail">
        <a
          href={videoLink}
          data-youtube-video-token={videoToken}
          title="Watch Video on YouTube"
          onClick={loadYoutubeVideo}
          target="_blank"
          rel="noreferrer"
        >
          <img src={VideoImageLink} alt={alt} data-aspect-ratio={aspectRatio} />
        </a>
        <a href={videoLink} target="_blank" rel="noreferrer">
          Watch On <b>YouTube</b>
        </a>
      </div>
    </div>
  );
};

export default YoutubeFacade;
