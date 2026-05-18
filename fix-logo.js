const Jimp = require('jimp');

async function fixLogo() {
  try {
    const image = await Jimp.read('public/logo1.png');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      var red = this.bitmap.data[idx + 0];
      var green = this.bitmap.data[idx + 1];
      var blue = this.bitmap.data[idx + 2];
      
      // If pixel is very light (white or light grey from the checkerboard)
      if (red > 220 && green > 220 && blue > 220) {
          this.bitmap.data[idx + 3] = 0; // set alpha to 0 (transparent)
      }
    });
    
    // Crop transparent borders to make it naturally larger without CSS scale hacks
    image.autocrop();
    
    await image.writeAsync('public/logo2.png');
    console.log('Logo fixed successfully!');
  } catch (err) {
    console.error('Error fixing logo:', err);
  }
}

fixLogo();
