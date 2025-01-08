import { TripView } from "../functions/ojp";
import { format } from "date-fns";

import classes from './trip-row.module.css';
import { Share } from "./icons/share";
import { For } from "solid-js/web";

export function TripRow({ trip }: { trip: TripView }) {
  const fromTime = format(trip.stats.startDatetime, 'HH:mm');
  const toTime = format(trip.stats.endDatetime, 'HH:mm');
  const stylesheets = [...document.head.querySelectorAll('style')].filter(s => s.innerHTML.includes(classes.row) || s.innerHTML.includes(':root'))

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
      })
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgEl!.outerHTML);
  }

  return (
    <div class={classes.row}>
      <div class={classes.points}>
        <span>{trip.from.from.name}, Gl. {trip.from.from.platform?.actualPlatform ?? trip.from.from.platform?.plannedPlatform}</span>
        <span>{trip.to.to.name}</span>
      </div>
      <div class={classes.time}>
        <span>{fromTime}</span>
        <span class={classes.timeSeparator}></span>
        <span>{toTime}</span>
      </div>
      <div class={classes.share}>
        <button type="button" onclick={() => share()}>
          <Share />
        </button>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" height="56" width="316" ref={svgEl} class="hidden">
        <foreignObject width="100%" height="100%">
          <For each={stylesheets}>
            {(item) => <style innerHTML={item.innerHTML}></style>}
          </For>
          <div xmlns="http://www.w3.org/1999/xhtml" style="padding: 8px">
            <div class={classes.points}>
              <span>{trip.from.from.name}, Gl. {trip.from.from.platform?.actualPlatform ?? trip.from.from.platform?.plannedPlatform}</span>
              <span>{trip.to.to.name}</span>
            </div>
            <div class={classes.time}>
              <span>{fromTime}</span>
              <span class={classes.timeSeparator}></span>
              <span>{toTime}</span>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}