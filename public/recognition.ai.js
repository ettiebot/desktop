const tf = window.tf;

// eslint-disable-next-line no-unused-vars
class RecognitionAI {
  constructor() {
    this.baseRecognizer = window.speechCommands.create("BROWSER_FFT");
  }

  async loadModel() {
    console.log("[init] model loading");
    await this.baseRecognizer.ensureModelLoaded();
    console.log("[init] model loaded");
  }

  // Collect examples
  collect() {
    this.transferRecognizer = this.baseRecognizer.createTransfer("mention");

    return async (exampleName) => {
      await this.transferRecognizer.collectExample(exampleName, {
        durationSec: 4,
      });
    };
  }

  // Train model
  async train() {
    await tf.nextFrame();

    // Train model with examples
    await this.transferRecognizer.train({
      epochs: 1500,
      validationSplit: 0.1,
      fineTuningEpochs: 500,
      callback: {
        onEpochEnd: async (epoch, logs) => {
          window.onEpochChange(epoch, 1500);
          console.log(
            `Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`
          );
        },
      },
      fineTuningCallback: {
        onEpochEnd: async (epoch, logs) => {
          window.onEpochChange(epoch, 500);
          console.log(epoch, logs.loss, logs.acc, logs.val_loss, logs.val_acc);
        },
      },
    });

    await this.transferRecognizer.save();
  }

  // Load examples
  async loadExamples() {
    // Load model
    await this.loadModel();
    // Create transfer recognizer
    this.transferRecognizer = this.baseRecognizer.createTransfer("mention");
    // Load trained model
    await this.transferRecognizer.load();
  }

  // Listen microphone
  async listen(cb) {
    await this.transferRecognizer.listen((result) => {
      // - result.scores contains the scores for the new vocabulary, which
      //   can be checked with:
      const words = this.transferRecognizer.wordLabels();

      console.log(result);

      const mostLikelyResultIndex = result.scores.indexOf(
        Math.max.apply(null, result.scores)
      );

      const mostLikelyWord = words[mostLikelyResultIndex];

      if (result.scores[mostLikelyResultIndex] < 0.97) return;

      console.log(mostLikelyWord, result.scores[mostLikelyResultIndex]);

      cb(mostLikelyWord);
    });
  }
}

window.rai = new RecognitionAI();
