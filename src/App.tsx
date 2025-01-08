import { createSignal, For } from 'solid-js'
import { LocationSearch } from './ui/location-search.tsx'
import { Location } from 'ojp-sdk'
import { effect } from 'solid-js/web';
import { searchTrips, TripView } from './functions/ojp.ts';
import { TripRow } from './ui/trip-row.tsx';

function App() {
  const [from, setFrom] = createSignal<Location>();
  const [to, setTo] = createSignal<Location>();
  const [trips, setTrips] = createSignal<TripView[]>([]);
  
  effect(() => {
    if (!from() || !to()) {
      return;
    }

    const date = new Date();
    date.setHours(new Date().getHours() + 2);

    searchTrips(from()!, to()!, date).then(setTrips)
  });

  return (
    <main class="container-small">
      <h1 class="center">Reise teilen</h1>
      <form class="card | flow">
        <div class="flow">
          <LocationSearch label="Von" location={from()} onChange={setFrom} name="from" />
          <LocationSearch label="Nach" location={to()} onChange={setTo} name="to" />
        </div>

        <div>
          <For each={trips()}>
            {(item) => <TripRow trip={item} />}
          </For>
        </div>
      </form>
    </main>
  )
}

export default App
