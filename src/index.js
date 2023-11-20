const worker = new Worker(new URL('./deep-thought.js', import.meta.url))

worker.postMessage({
  question: 'The answer...'
})

worker.onMessage = ({ data: { answer } }) => {
  console.log(answer)
}
