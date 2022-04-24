import { SERIES_API, SERIES_INFO_API } from "./ApiList"

export const getMatchList = async () => {
  try {
    var series = await getSeriesList()
    console.log("Series", series);
    if(series?.id) {
      var resp = await fetch(SERIES_INFO_API + '&id=' + series.id)
      var matchList = await resp.json()
      return matchList?.data
    }
  } catch (e) {
    return {
      error: e.message
    }
  }
}

export const getSeriesList = async (search = "IPL") => {
  try {
    var result = await fetch(SERIES_API + '&search=' + search)
    var json = await result.json()
    return json?.data?.[0]
  } catch (e) {
    return {
      error: e.message
    }
  }
}