export default function(graphic, destination, suffix, format, id) {
  graphic.write(`${destination}${suffix}.${format}`, (err) => {
    if (!err) console.log(`Written composite image for size:${id} to ${destination}.`);
  });
}