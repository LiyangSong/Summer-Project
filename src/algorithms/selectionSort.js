import { deepCopy } from "../utils.js";

export default function selectionSortResult(startNumbers) {
    let result = [{
        step: 0,
        numbers: startNumbers,
        log: "Start Numbers."
    }];
    let currentStep = 0;
    let currentNumbers = deepCopy(startNumbers);
    for (let i = 0; i < currentNumbers.length - 1; i++) {
        let minIndex = i;
        currentStep++;
        currentNumbers[minIndex].isActive = true;
        result.push({
          step: currentStep,
          numbers: deepCopy(currentNumbers),
          log: `${currentNumbers[minIndex].number} is the minimum from position ${i+1} to position ${minIndex+1}.`,
        });
    
        for (let j = i + 1; j < currentNumbers.length; j++) {
          currentStep++;
          if (parseInt(currentNumbers[j].number) < parseInt(currentNumbers[minIndex].number)) {
            currentNumbers[minIndex].isActive = false;
            minIndex = j;
            currentNumbers[minIndex].isActive = true;
            result.push({
              step: currentStep,
              numbers: deepCopy(currentNumbers),
              log: `${currentNumbers[minIndex].number} is the minimum from position ${i+1} to position ${j+1}.`,
            });
          }
          else{
            result.push({
                step: currentStep,
                numbers: deepCopy(currentNumbers),
                log: `${currentNumbers[minIndex].number} is the minimum from position ${i+1} to position ${j+1}.`,
              });
          }
        }
    
        if (minIndex !== i) {
          // Swap values
          let temp = deepCopy(currentNumbers[i]);
          currentNumbers[i] = deepCopy(currentNumbers[minIndex]);
          currentNumbers[minIndex] = temp;
          currentStep++;
          result.push({
            step: currentStep,
            numbers: deepCopy(currentNumbers),
            log: `Swap ${currentNumbers[i].number} and ${currentNumbers[minIndex].number}.`,
          });
        }
        currentNumbers[i].isSorted = true;
        currentStep++;
        result.push({
            step: currentStep,
            numbers: deepCopy(currentNumbers),
            log: `${currentNumbers[i].number} is sorted.`,
        });
        for (let n = 0; n < currentNumbers.length; n++) {
            currentNumbers[n].isActive = false;
        }
        for (let n = 0; n < i; n++) {
            currentNumbers[i].isSorted = true;
        }
    }
    currentNumbers[currentNumbers.length - 1].isSorted = true;
    result.push({
        step: currentStep + 1,
        numbers: deepCopy(currentNumbers),
        log: "All set. Sorting completed."
    });

    return result;
}