import React, { Component } from "react";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

class Slider extends Component<SliderProps> {
  sliderRef = React.createRef<HTMLDivElement>();
  thumbRef = React.createRef<HTMLDivElement>();

  state = {
    dragging: false,
    value: this.props.value ?? 50,
  };

  handleThumbPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    this.setState({ dragging: true });
    this.thumbRef.current?.setPointerCapture(e.pointerId);
  };

  handleSliderPointerMove = (e: React.PointerEvent) => {
    if (this.state.dragging) {
      this.updateValue(e);
    }
  };

  handleThumbPointerUp = () => {
    this.setState({ dragging: false });
  };

  handleSliderPointerDown = (e: React.PointerEvent) => {
    this.updateValue(e);
  };

  updateValue = (e: React.PointerEvent) => {
    if (this.sliderRef.current) {
      const sliderRect = this.sliderRef.current.getBoundingClientRect();
      const newValue = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      const roundedValue = Math.round(Math.min(100, Math.max(0, newValue)));
      this.setState({ value: roundedValue });
      this.props.onValueChange(roundedValue);
    }
  };

  render() {
    return (
      <div className="slider-container">
        <div
          ref={this.sliderRef}
          className="slider"
          onPointerDown={this.handleSliderPointerDown}
          onPointerMove={this.handleSliderPointerMove}
        >
          <div
            ref={this.thumbRef}
            className="thumb"
            style={{ left: `${this.state.value}%` }}
            onPointerDown={this.handleThumbPointerDown}
            onPointerMove={this.handleSliderPointerMove}
            onPointerUp={this.handleThumbPointerUp}
          >
            {Math.round(this.state.value)}
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
