import React from 'react';
import ImageUploader from 'react-images-upload';

import './PictureUploader.less';

const PictureUploader = React.createClass({

  getInitialState() {
    return {
      fileName: 'Choose a file'
    };
  },

    handlePictureChange(event) {
      this.props.onPictureAdd({picture: event});
    },

    render() {
      return (
           /* <div className='PictureUploader'>
                  <form ref='uploadForm'
                        id='uploadForm'
                  >

                    <input type="file" name="sampleFile" onChange={this.handlePictureChange}   />

                    <input type="file" name="sampleFile" id="file-1" className="inputfile inputfile-1"
                           onChange={this.handlePictureChange}/>
                    <label htmlFor="file-1">
                      <svg xlinkHref="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                      </svg>
                      <input type="text" value={this.state.fileName} readOnly />
                    </label>
                  </form>
            </div>*/
      <ImageUploader
        buttonText='Choose image'
        onChange={this.handlePictureChange}
        imgExtension={['.jpg', '.gif', '.png']}
        maxFileSize={5242880}
        singleImage={true}
        withIcon={false}
        withPreview={true}
        withLabel={false}
        className='imageUploader'
        buttonClassName='imageUploaderBtn'
      />
        );
      ///   TODO: at 2:30 +- file name changing worked in input
    }
});

export default PictureUploader;
