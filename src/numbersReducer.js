import bubbleSort from './algorithms/bubbleSort.js';
import insertionSort from './algorithms/insertionSort.js';
import selectionSort from './algorithms/selectionSort.js';
import quickSort from './algorithms/quickSort.js';
import mergeSort from './algorithms/mergeSort.js';
import heapSort from './algorithms/heapSort.js';
import { initialNumbers } from './ContentProvider.js';

export default function numbersReducer(numbers, action) {
    switch(action.type) {
        case "initialize": {
            return initialNumbers;
        }

        case "changeNumber": {
            return numbers.map(number => {
                if (number.id === action.id) {
                    return {
                        id: action.id,
                        number: action.nextNumber,
                        isActive: false,
                        isSorted: false};
                } else {
                    return number;
                }
            })
        }

        case "addLength": {
            if (numbers.length < 10) {
                return [
                    ...numbers,
                    {id: numbers.length + 1, number: null}
                ]
            } else {
                return numbers;
            }
        }

        case "reduceLength": {
            if (numbers.length > 2) {
                return numbers.slice(0, numbers.length - 1)
            } else {
                return numbers;
            }
        }

        case "sortSteps": {
            switch(action.sortType) {
                case "bubbleSort": {
                    return bubbleSort(numbers, action.step)
                }

                case "insertionSort": {
                    return insertionSort(numbers, action.step)
                }

                case "selectionSort": {
                    return selectionSort(numbers, action.step)
                }

                case "quickSort": {
                    return quickSort(numbers, action.step)
                }

                case "mergeSort": {
                    return mergeSort(numbers, action.step)
                }

                case "heapSort": {
                    return heapSort(numbers, action.step)
                }
            }

        }
    }
}