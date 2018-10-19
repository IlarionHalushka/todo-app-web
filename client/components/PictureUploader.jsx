import React from "react";
import ImageUploader from "react-images-upload";

import "./PictureUploader.less";

const PictureUploader = React.createClass({
  getInitialState() {
    return {
      fileName: "Choose a file"
    };
  },

  handlePictureChange(event) {
    this.props.onPictureAdd({ picture: event });
  },

  render() {
    return (
      <ImageUploader
        buttonText="Choose image"
        onChange={this.handlePictureChange}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
        singleImage={false}
        withIcon={false}
        withPreview={true}
        withLabel={false}
        className="imageUploader"
        buttonClassName="imageUploaderBtn"
      />
    );
  }
});

export default PictureUploader;
