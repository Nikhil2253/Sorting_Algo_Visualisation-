import { useState } from "react";
import Display from "./Display";
import "./App.css";

function App() {
  const [arr, setArr] = useState(
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000) + 1)
  );

  const [processing, setProcessing] = useState(false);
 const[Algo,setAlgo]=useState("");
  const BubbleSort = async (e) => {
    e.preventDefault();
    if (processing) return;

    setProcessing(true);
    setAlgo("Bubble Sort");
    let temparr = [...arr];

    for (let i = 0; i < temparr.length; i++) {
      for (let j = 0; j < temparr.length - i - 1; j++) {
        if (temparr[j] > temparr[j + 1]) {
          let temp = temparr[j];
          temparr[j] = temparr[j + 1];
          temparr[j + 1] = temp;

          await new Promise((resolve) => setTimeout(resolve, 1));
          setArr([...temparr]);
        }
      }
    }
    setProcessing(false);
  };

  const SelectionSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Selection Sort");
    let temparr = [...arr];

    for (let i = 0; i < temparr.length; i++) {
      let min_ind = i;

      for (let j = i + 1; j < temparr.length; j++) {
        if (temparr[min_ind] > temparr[j]) {
          min_ind = j;
        }
      }

      let temp = temparr[min_ind];
      temparr[min_ind] = temparr[i];
      temparr[i] = temp;

      await new Promise((resolve) => setTimeout(resolve, 100));
      setArr([...temparr]);
    }
    setProcessing(false);
  };

  const InsertionSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Insertion Sort");
    let temparr = [...arr];

    for (let i = 1; i < temparr.length; i++) {
      let key = temparr[i];
      let j = i - 1;

      while (j >= 0 && temparr[j] > key) {
        temparr[j + 1] = temparr[j];
        j--;

        await new Promise((resolve) => setTimeout(resolve, 1));
        setArr([...temparr]);
      }

      temparr[j + 1] = key;

      await new Promise((resolve) => setTimeout(resolve, 1));
      setArr([...temparr]);
    }
    setProcessing(false);
  };

  const merge = async (array, low, mid, high) => {
    let left = array.slice(low, mid + 1); 
    let right = array.slice(mid + 1, high + 1); 

    let i = 0,
      j = 0,
      k = low;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        array[k] = left[i];
        i++;
      } else {
        array[k] = right[j];
        j++;
      }
      k++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      setArr([...array]);
    }

    while (i < left.length) {
      array[k] = left[i];
      i++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      setArr([...array]);
    }

    while (j < right.length) {
      array[k] = right[j];
      j++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      setArr([...array]);
    }
  };

  const mergeSort = async (array, low, high) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      await mergeSort(array, low, mid);
      await mergeSort(array, mid + 1, high);
      await merge(array, low, mid, high);
    }
  };

  const MergeSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Merge Sort");
    let temparr = [...arr];
    await mergeSort(temparr, 0, temparr.length - 1);
    if(!processing) setProcessing(false);
  };

  const quickSort = async (array, low, high) => {
    if (low < high) {
      const pi = await partition(array, low, high);
      await quickSort(array, low, pi - 1);
      await quickSort(array, pi + 1, high);
    }
    
  };

  const partition = async (array, low, high) => {
    const pivot = array[low];
    let i = low + 1;
    let j = low + 1;

    while (j <= high) {
      if (array[j] < pivot) {
        [array[i], array[j]] = [array[j], array[i]];
        i++;
        await new Promise((resolve) => setTimeout(resolve, 20));
        setArr([...array]);
      }
      j++;
    }

    [array[low], array[i - 1]] = [array[i - 1], array[low]];
    await new Promise((resolve) => setTimeout(resolve, 20));
    setArr([...array]);

    return i - 1;
  };

  const QuickSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Quick Sort");
    let temparr = [...arr];
    await quickSort(temparr, 0, temparr.length - 1);
    if(!processing) setProcessing(false);
  };
  const radixSort = async (array) => {
    const getMax = (array) => {
      return Math.max(...array);
    };

    const countingSort = async (array, exp) => {
      const output = new Array(array.length);
      const count = new Array(10).fill(0);

      for (let i = 0; i < array.length; i++) {
        const index = Math.floor(array[i] / exp) % 10;
        count[index]++;
      }

      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      for (let i = array.length - 1; i >= 0; i--) {
        const index = Math.floor(array[i] / exp) % 10;
        output[count[index] - 1] = array[i];
        count[index]--;
        await new Promise((resolve) => setTimeout(resolve, 1));
        setArr([...output]);
      }

      for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
      }
    };

    const max = getMax(array);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(array, exp);
    }
    setProcessing(false);
  };

  const RadixSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Radix Sort");
    let temparr = [...arr];
    await radixSort(temparr);
  };

  const HeapSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Heap Sort");
    let temparr = [...arr];

    const heapify = async (arr, n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        await new Promise((resolve) => setTimeout(resolve, 10)); 
        setArr([...arr]);

        await heapify(arr, n, largest);
      }
    };

    const n = temparr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(temparr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [temparr[0], temparr[i]] = [temparr[i], temparr[0]];

      await new Promise((resolve) => setTimeout(resolve, 20));
      setArr([...temparr]);

      await heapify(temparr, i, 0);
    }
    setProcessing(false);
  };

  const ShellSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Shell Sort");
    let temparr = [...arr];
    let n = temparr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        let temp = temparr[i];
        let j = i;
        while (j >= gap && temparr[j - gap] > temp) {
          temparr[j] = temparr[j - gap];
          j -= gap;

          await new Promise((resolve) => setTimeout(resolve, 20));
          setArr([...temparr]);
        }
        temparr[j] = temp;
      }
      gap = Math.floor(gap / 2);
    }
    setProcessing(false);
  };

  const countingSort = async (array) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(array.length);

    for (let i = 0; i < array.length; i++) {
      count[array[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
      const num = array[i];
      const index = count[num - min] - 1;
      output[index] = num;
      count[num - min]--;
      await new Promise((resolve) => setTimeout(resolve, 10));
      setArr([...output]);
    }

    for (let i = 0; i < array.length; i++) {
      array[i] = output[i];
    }
    setProcessing(false);
  };

  const CountSort = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("Count Sort");
    let temparr = [...arr];
    await countingSort(temparr);
  };

  const Reset = (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    setAlgo("");
    let newArr = Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 1000) + 1
    );
    setArr([...newArr]);
    setProcessing(false);
  };
  return (
    <div className="app-container">
      <h1 className="header">Sorting Algorithm Visualiser : <span> {Algo}</span></h1>
      <Display array={arr} />
      <div className="button-container">
        <button onClick={BubbleSort} disabled={processing}  style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Bubble Sort
        </button>
        <button onClick={SelectionSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Selection Sort
        </button>
        <button onClick={InsertionSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Insertion Sort
        </button>
        <button onClick={MergeSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Merge Sort
        </button>
        <button onClick={QuickSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Quick Sort
        </button>
        <button onClick={RadixSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Radix Sort
        </button>
        <button onClick={ShellSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Shell Sort
        </button>
        <button onClick={HeapSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Heap Sort
        </button>
        <button onClick={CountSort} disabled={processing} style={{
    backgroundColor: processing ? "#965eff" : "#5900ff",
  }}>
          Counting Sort
        </button>
      </div>
      <button className="reset" onClick={Reset} disabled={processing}>
        Reset
      </button>
    </div>
  );
}

export default App
