import { useState } from "react";

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};


const numberOfLabels = 7;
export const data = Array.from({ length: numberOfLabels }, () => Math.floor(Math.random() * 101));
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: false,
    customCanvasBackgroundColor: {
      color: 'red',
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => value + "C"
      }
    },
  },

  plugin: plugin
}


