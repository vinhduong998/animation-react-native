import { ToastAndroid } from "react-native";
import { Device } from "ui/device.ui";
import Toast from 'react-native-simple-toast';
import dayjs from "dayjs";

export const delay = async (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time)
    }, time);
  })
}

export function parseJson(value: string | any) {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return {};
  }
}

export function regexLink(link: string): RegExpMatchArray | null {
  let regex = /(?:https?:\/\/)?(?:www\.)?(?:(?:youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+)/g;
  return link.match(regex);
}

export const convertNumber = (n: string | number, convertB = true, convertM = true, convertK = true) => {
  const number = Number(n)
  if (number >= 1000000000 && convertB) {
    if (number % 1000000000 === 0){
      return `${(number / 1000000000)}B`
    }
    return `${(number / 1000000000).toFixed(1)}B`
  }
  if (number >= 1000000 && convertM) {
    if (number % 1000000 === 0){
      return `${(number / 1000000)}M`
    }
    return `${(number / 1000000).toFixed(1)}M`
  }
  if (number >= 1000 && convertK) {
    if (number % 1000 === 0){
      return `${(number / 1000)}k`
    }
    return `${(number / 1000).toFixed(1)}k`
  }
  return `${Math.max(number, 0)}`
}

export const convertLastActive = (time?: Date | number | string) => {
  if (!time) {
    return ""
  }
  const timeNumber = dayjs().diff(dayjs(time), "minutes")
  if (timeNumber === 0) {
    return "Just now"
  }
  const days = Math.floor(timeNumber / 1440);

  // Calculate the number of hours
  const hours = Math.floor((timeNumber % 1440) / 60);

  // Calculate the number of minutes
  const remainingMinutes = timeNumber % 60;

  return days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : `${remainingMinutes} minutes ago`
};

export const showToast = (text: string) => {
  if (Device.isAndroid) {
    ToastAndroid.show(text, ToastAndroid.BOTTOM)
  } else {
    Toast.showWithGravity(text, Toast.SHORT, Toast.BOTTOM);
  }
}