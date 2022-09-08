// https://github.com/fcor/arjs-gestures

class gestureHandler {
  data = {
    enabled: true,
    rotationFactor: 5,
    minScale: 0.3,
    maxScale: 8,
    scaleFactor: 1,
  };

  constructor(shape) {
    this.shape = shape;

    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.shape.scale;
  }

  update(shape, visibility) {
    this.shape = shape;
    this.isVisible = visibility;

    if (this.isVisible) {
      document.addEventListener("onefingermove", this.handleRotation);
      document.addEventListener("twofingermove", this.handleScale);
    } else {
      document.removeEventListener("onefingermove", this.handleRotation);
      document.removeEventListener("twofingermove", this.handleScale);
    }
  }

  remove() {
    document.removeEventListener("onefingermove", this.handleRotation);
    document.removeEventListener("twofingermove", this.handleScale);
  }

  handleRotation(event) {
    if (this.isVisible) {
      this.shape.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.shape.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    }
  }

  handleScale(event) {
    if (this.isVisible) {
      this.data.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.data.scaleFactor = Math.min(
        Math.max(this.data.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.shape.scale.x = this.data.scaleFactor * this.initialScale.x;
      this.shape.scale.y = this.data.scaleFactor * this.initialScale.y;
      this.shape.scale.z = this.data.scaleFactor * this.initialScale.z;
    }
  }
}
