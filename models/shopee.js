class Shopee {
  static async getShopeeAffiliate() {
    try {
      const url =
        "https://seller.shopee.co.id/api/v3/affiliateplatform/creator/list";

      const headers = {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json; charset=UTF-8",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
        cookie:
          "SPC_F=qWPWKUGnN2SzaQKOkxqahzv7bJHWHnJb; REC_T_ID=38df52b4-2e60-11f0-8883-564e4dd5a429; SPC_CLIENTID=qWPWKUGnN2SzaQKOkdymbittdbaksybb; _gcl_au=1.1.1089075360.1754797338; _gcl_gs=2.1.k1^$i1757758071^$u157451640; _med=cpc; _gcl_aw=GCL.1757758076.Cj0KCQjwrJTGBhCbARIsANFBfgsuhEfoJHpuWSe2ndh1bcW_L3nRhcb1fK4mk-Zqcv0AHG0PdmD2PqsaArzzEALw_wcB; _gac_UA-61904553-8=1.1757758076.Cj0KCQjwrJTGBhCbARIsANFBfgsuhEfoJHpuWSe2ndh1bcW_L3nRhcb1fK4mk-Zqcv0AHG0PdmD2PqsaArzzEALw_wcB; SPC_CDS=f16f7d2a-bd45-4ec3-b355-9106067f7246; SPC_SC_SA_TK=; SPC_SC_SA_UD=; SPC_SC_OFFLINE_TOKEN=; SC_SSO=-; SC_SSO_U=-; SPC_SI=CbLKaAAAAAByZkdnM1F0bEP/lwMAAAAAVmVqTm9zZFM=; SPC_SEC_SI=v1-bVFOUTFMZU5TNU5XQUFlY8xo51ExS03pHG19q7e7vtBrq70Fq/D9IC59RL6BZR+RMW2ICnHBEcNnUUAUqWGWiSWToPy4zs1Y0MmL81Mgar4=; csrftoken=nrBmboehDn3ppZaWa5lIWoClX6DjBXFa; SPC_SI=+VbKaAAAAABiejJrc3BRZcUMewAAAAAAcHEzTEVkdm4=; _gid=GA1.3.1174856504.1758430284; _ga=GA1.1.87768262.1746965125; SPC_ST=.UnZhczE2QmxJQUdzY3M4SP0diZFTMZOZiqAooPa/0WhnqS30mUxYfgZsxfWIlceWlgRiMKN6TIyICW4F29aSrbeLAI8b3a5oYGD8zw6ZxTUJ6CscpVaxdE9ewUTLdBWRnG0oj48ADpGn3aoZ/Z/PMQAFnj/V0zZNCZuwA8es5aIWqrRPMad3DjbGl8+sJhuYH7YlqBesbtabuar6R79tVwQZvqZXnadLh/9taK2s3fPNjgEiMpqjlEM4OIzDl1i7; _ga_SW6D8G0HXK=GS2.1.s1758430284^$o67^$g1^$t1758430365^$j60^$l1^$h1248817789; SPC_SC_SESSION=g5ydFU8PeXco8FYE8qMx8cbNZaqbjwSQexGWLNInUYuD06f95o04aep5uR/sHJztCsZuoRIQVMRiaKVkC/9HG16UO1ENBOPAneP/DgaQ3lsDtCRuERUdH6XUVUtU7bWf5CeSPOAjlqHarcQaXVZ9fMZ/CVumu4Op/5r/9eFEkm5X9+ip7TXN0sLhRhEischV3HPj1wePviBTk54kinyW96bVMRPDuU5hJvmM82sFEydo8JkRPCJdj38w1z5eXKQqcc7Ylt1/CnUlpdStAwYBWzw==_1_240983141; SPC_SC_MAIN_SHOP_SA_UD=0; SPC_STK=snIG7gULLWyEvZeQnTO6IHABR+tKVdTpWuJo7hM0Fu+6rUUqyXdtnCiabahRHfudQBlFWoU3/njBpETKzM73WXhs08VlgHu7t2DPsy8h9vXQlBwb4Kx7NTPjq724I1Hstai1vQq6J5zOF7o6Ijq5r+fc2GYf3J1TsKs5JI1o+LG0kLz77NuPO5HS3vHkjywUCb3Ac/RLhOTuncYenczO8wb0wtID+hprSIYbe9Qvd6UZzbdXlNqVSV6JGz8PdawSwM6gc7p0kNzCmKua2lb6GbJGApIBVv8bL6pkGAM46nTD09v/1i9Fl4OORHkotUXK41fWBVG3zZIOWyist0sukmRK0rLyB0mfVIke9PNLIex8aBIFYqA7UwTFSE5ZaWQfwC0RCZ97qlhTwAcDqEkxOPP5a3Ontm20SpIQHGICGyLNrGVqUydy9m8WogxBH5+BA3cM4ShqPMymplvIuNXqMfa+x7txrTFpWKdInvbqU0A+xL40a0IvuPz0oCeZ3szF0m1/ltvToAwtMtE9WEBxzw==; SC_DFP=UkiVciEJbPSzIOcRxVxiIVKqUFteOlEJ; _QPWSDCXHZQA=7c27a1ea-3670-487f-f870-77989c6055e4; REC7iLP4Q=39add35a-df03-4125-87fb-d0ac4bcb7ad2; SPC_CDS_CHAT=184047e9-ba34-40ab-a33b-d19213f676b8; _sapid=607c1205c1f8dd6d6521de07ace089d7e2485134e3af9f1a78684fc1; web-seller-affiliate_language=id; MOCK_TYPE=; web-seller-affiliate-region=id; language=id; SPC_U=240983141; CTOKEN=h9B75panEfC2Hcpg0KtZxQ%3D%3D; SPC_EC=.ejh3dzJpWlpTYTlHNjlmTi8X4mUINMN6Qed+te+rff//GHuFigHz4ia7h60S4OgnplZYdIA3efdPZxEPpnf5qCr/BTxSyJLcnUxQl28T0/Kk1lFye2DYXOQV/DzF6t25qr8kiNZvaxyFR8xAHxXakjSC3uC76p/kx+YJeB6IgeioeY90sG2oYxI/0f4u/jpYva04a1oodqbP3bWAHyAqG1ym8k+4pIqM2GkpGjIH4OYrQ6IK08dKI/X1kVYIgeFK; SPC_R_T_ID=vzXg+l8u/wiM1AvcOTtHXD8Yt7u+kE+djTiv88FWbv2cVCElOUByebAsDnO2y6VVoSFIQHUDUOuONe+6rWwLs0JTFhZHkLqjpCEizYOthKKpdMxbK7ZiTJlpX2VIK7DQLP872PqLhcj44CKTL3Qy0F3wLlbR3FNJA8r432X7ho0=; SPC_R_T_IV=aVYyaUY1RFhoQnFmcTdLTQ==; SPC_T_ID=vzXg+l8u/wiM1AvcOTtHXD8Yt7u+kE+djTiv88FWbv2cVCElOUByebAsDnO2y6VVoSFIQHUDUOuONe+6rWwLs0JTFhZHkLqjpCEizYOthKKpdMxbK7ZiTJlpX2VIK7DQLP872PqLhcj44CKTL3Qy0F3wLlbR3FNJA8r432X7ho0=; SPC_T_IV=aVYyaUY1RFhoQnFmcTdLTQ==; shopee_webUnique_ccd=VoUZk3DVEq8%2FtrQRp3MQ9w%3D%3D%7C3ocvMQdJpPsrjsKevRa36dJxe%2Fweja8%2FOqUpbCTXSido1A6muTDJSUoBGpRltS%2Fs%2Bgq8UzN4r9Hc6QYp%7CKY8q9NaE%2Bk%2FGyhJ9%7C08%7C3; ds=539abd749514b6029aaf7ba1eb9e0e68",
      };

      const body = {
        offset: 0,
        page_type: "ams_kol_marketplace",
        limit: 12,
        request_id: "3219fdcf-be3d-4fee-9ded-443c2d2d77a1",
        is_liked_kol: false,
        category_id_list: [100630],
        show_meta_link: 0,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Shopee API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data dari API: ${error.message}`);
      throw error;
    }
  }
}

export default Shopee;
