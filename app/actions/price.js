export function submitRealPrice(priceInfo) {
  return (dispatch) => {
    dispatch({
      type: 'SUBMIT_REAL_PRICE',
      // TODO: delete later... 가격 입력 컨트롤러 및 데이터스키마 생성 필요
      priceInfo: priceInfo
    });
    return fetch('/insertPrice', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceInfo
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'SUBMIT_REAL_PRICE_SUCCESS',
            priceInfo: json
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'SUBMIT_REAL_PRICE_FAILURE',
            priceInfo: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
