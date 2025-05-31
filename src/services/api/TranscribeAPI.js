import axios from "axios";
import config from "../../../config";

export async function TranscribeAPI({body}) {
  const headers = { "Content-Type": "application/json" }
    const url = `${config.BASE_URL}/transcribe`;
    return axios.post(url,body,headers);
  }