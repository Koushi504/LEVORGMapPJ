document.addEventListener("DOMContentLoaded", () => {
    const svgObject = document.getElementById("japan-map");
  
    // SVGが読み込まれた後に操作する
    svgObject.addEventListener("load", () => {
      const svgDoc = svgObject.contentDocument; // SVGの内容を取得
      const prefElements = svgDoc.querySelectorAll("[id]"); // IDを持つ要素を取得
  
      prefElements.forEach(pref => {
        const prefId = pref.id; // 各県のIDを取得
  
        // 画像が存在するか確認して表示
        findImages(prefId, imagePaths => {
          if (imagePaths.length > 0) {
            // 画像が存在する場合、県を緑色に変更
            pref.setAttribute("fill", "green");
          }
  
          // 各県にクリックイベントを追加
          pref.addEventListener("click", () => {
            const imageContainer = document.getElementById("pref-image");
            imageContainer.innerHTML = ""; // 既存の画像をクリア
  
            if (imagePaths.length > 0) {
              // 画像が存在する場合、すべての画像を表示
              imagePaths.forEach(path => {
                const imgElement = document.createElement("img");
                imgElement.src = path;
                imgElement.alt = `${prefId}の画像`;
                imgElement.style.margin = "5px"; // 見やすくするための余白
                imageContainer.appendChild(imgElement);
              });
            } else {
              // 画像が存在しない場合はメッセージを表示
              imageContainer.innerHTML = `<p>${prefId}の画像はありません。</p>`;
            }
          });
        });
      });
    });
  
    // 特定の県名を含む画像を探す関数
    function findImages(prefId, callback) {
      const maxImages = 10; // 最大画像数を設定（例: 10枚まで）
      const imagePaths = [];
  
      let checked = 0; // 確認済みの画像数
      for (let i = 1; i <= maxImages; i++) {
        const imagePath = `images/${prefId}-${i}.jpeg`;
        checkImageExists(imagePath, exists => {
          if (exists) {
            imagePaths.push(imagePath);
          }
          checked++;
          if (checked === maxImages) {
            callback(imagePaths); // 全ての確認が終わったらコールバックを実行
          }
        });
      }
    }
  
    // 画像の存在を確認する関数
    function checkImageExists(url, callback) {
      const img = new Image();
      img.onload = () => callback(true); // 画像が読み込めた場合
      img.onerror = () => callback(false); // 画像が存在しない場合
      img.src = url;
    }
  });
