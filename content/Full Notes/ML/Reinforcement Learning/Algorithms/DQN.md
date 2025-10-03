# Experience Replay: 
- Allows you to reuse the same training examples, memory is always good
- Catastrophic forgetting means you have to train the model everywhere all the time, because sampling sequential episodes means it will forget the first few methods eventually.
- Hence, by randomly sampling in batches from previous experiences we ensure that there is less variance and no forgetting.
## Why we have a stable target network:
- 