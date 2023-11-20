self.onMessage = ({ data: { question } }) => {
  self.postMessage({
    answer: 42
  })
}