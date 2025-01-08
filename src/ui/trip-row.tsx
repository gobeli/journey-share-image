import { TripView } from "../functions/ojp";
import { format } from "date-fns";
import { Share } from "./icons/share";

import classes from './trip-row.module.css';

export function TripRowItem({trip}: { trip: TripView }) {
  const fromTime = format(trip.stats.startDatetime, 'HH:mm');
  const toTime = format(trip.stats.endDatetime, 'HH:mm');

  // Use style tag to render correctly inside an svg
  const css = `
    :root {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }

    .time,
    .points {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .timeSeparator {
      height: 2px;
      flex: 1;
      background-color: hsl(55 10% 79%);
      position: relative;
    }

    .timeSeparator:after {
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 100%;
      background-color: hsl(55 10% 79%);
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .points {
      color: hsl(50 3% 42%);
      font-size: 12px;
    }
  `

  return (
    <>
      <style>
        {css}
      </style>
      <div class="points">
        <span>{trip.from.from.name}, Gl. {trip.from.from.platform?.actualPlatform ?? trip.from.from.platform?.plannedPlatform}</span>
        <span>{trip.to.to.name}</span>
      </div>
      <div class="time">
        <span>{fromTime}</span>
        <span class="timeSeparator"></span>
        <span>{toTime}</span>
      </div>
    </>
  )
}

export function TripRow({ trip }: { trip: TripView }) {
  let svgEl;

  function share() {
    if (!navigator.share) {
      return;
    }

    let img = new Image();
    let canvas = document.createElement("canvas");
    canvas.width = 316;
    canvas.height = 56;

    img.onload = async function () {
      let ctx = canvas.getContext("2d")!;
      
      ctx.fillStyle = 'hsl(48 100% 97%)';
      ctx.fillRect(0, 0, 316, 56);
      ctx.drawImage(img, 0, 0);

      const blob = await (await fetch(canvas.toDataURL('image/png'))).blob();
      const file = new File([blob], 'fileName.png', { type: blob.type });

      navigator.share({ 
        text: `Von ${trip.from.from.name} nach ${trip.to.to.name}`,
        url: location.href,
        files: [ file ]
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgEl!.outerHTML);
  }

  return (
    <div class={classes.row}>
      <TripRowItem trip={trip} />
      <div class={classes.share}>
        <button type="button" onclick={() => share()}>
          <Share />
        </button>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" height="56" width="316" ref={svgEl} class="hidden">
        <foreignObject width="100%" height="100%">
          <div {...{xmlns: 'http://www.w3.org/1999/xhtml'}} style="padding: 8px">
            <TripRowItem trip={trip} />
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}