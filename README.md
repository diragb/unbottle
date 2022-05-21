# How geofielding works

```ts
// Let writer and reader be two objects:
const writer = {
  coords: {
    lat: {
      max: 0,
      min: 0
    },
    long: {
      max: 0,
      min: 0
    }
  }
}

const reader = {
  coords: {
    lat: 0,
    long: 0
  },
  mul: 0
}

// Dequadrantize the coordinates:
const dequadrantizeRange = ({ lat, long }: { lat: { max: number, min: number }, long: { max: number, min: number } }) => ({
  lat: {
    max: lat.max + 90
    min: lat.min + 90
  },
  long: {
    max: long.max + 180,
    min: long.min + 180
  }
})

const dequadrantizePoint = ({ lat, long }: { lat: number, long: number }) => ({
  lat: lat + 90,
  long: long + 180
})

writer.coords = dequadrantizeRange(writer.coords)
reader.coords = dequadrantizePoint(reader.coords)


// Find the range (only for the writer):
const linearRange = ({ lat, long }: { lat: { max: number, min: number }, long: { max: number, min: number } }) => ({
  max: long.max * lat.max,
  min: long.min * lat.min
})

writer.range = linearRange(writer.coords) // We push this value to the DB


// Read (only for the reader):
reader.mul = reader.coords.lat * reader.coords.long // We compare this value against the writers' linearRanges

query(entriesRef, where("writer.range.max", "<", reader.range.mul), where("writer.range.min", ">", reader.range.mul))
```
