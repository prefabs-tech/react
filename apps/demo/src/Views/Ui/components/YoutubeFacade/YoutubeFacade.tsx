import React from "react";

import "./index.css";

interface IProperties {
  alt?: string;
  aspectRatio?: string;
  imageSource?: string;
  videoLink: string;
  videoToken: string;
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
        aspectRatio: aspectRatio,
        background: `url(${VideoImageLink}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <div className="facade-thumbnail">
        <a
          data-youtube-video-token={videoToken}
          href={videoLink}
          onClick={loadYoutubeVideo}
          rel="noreferrer"
          target="_blank"
          title="Watch Video on YouTube"
        >
          <img alt={alt} data-aspect-ratio={aspectRatio} src={VideoImageLink} />
        </a>
        <a href={videoLink} rel="noreferrer" target="_blank">
          Watch On <b>YouTube</b>
        </a>
      </div>
    </div>
  );
};

export default YoutubeFacade;
