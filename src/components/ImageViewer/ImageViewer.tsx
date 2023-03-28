import React, { useEffect, useState } from "react";
import { IIIFExternalWebResource } from "@iiif/presentation-3";
import OSD, { osdImageTypes } from "@/components/ImageViewer/OSD";
import { getImageServiceURI } from "@/services/iiif";
import { ConfigOptions } from "@/context/viewer-context";

interface ImageViewerProps {
  body: IIIFExternalWebResource;
  hasPlaceholder: boolean;
  options?: ConfigOptions;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ body, hasPlaceholder, options }) => {
  const [imageType, setImageType] = useState<osdImageTypes>();
  const [uri, setUri] = useState<string | undefined>();

  useEffect(() => {
    if (Array.isArray(body.service) && body.service.length > 0) {
      setImageType("tiledImage");
      setUri(getImageServiceURI(body.service));
    } else {
      setImageType("simpleImage");
      setUri(body.id);
    }
  }, [body]);

  return (
    <OSD
      uri={uri}
      key={uri}
      imageType={imageType}
      hasPlaceholder={hasPlaceholder}
      options={options} />
  );
};

export default ImageViewer;
