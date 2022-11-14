// 検索欄の値を取得
$("button").on("click", function () {
    //既存のレシピ表示を削除
    $(".recipeItem").remove();

    let y = $("#fish-name").val();

    let url = "";
    if (y === "サーモン" || y === "サケ" || y === "鮭" || y === "さけ") {
        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-70";
    } else if (y === "いわし" || y === "イワシ" || y === "鰯") {
        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-71";
    } else if (y === "さば" || y === "サバ" || y === "鯖") {
        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-72";
    } else if (y === "あじ" || y === "アジ" || y === "鯵") {
        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-73";
    } else if (y === "ぶり" || y === "ブリ" || y === "鰤") {
        url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-74";
    }

    // 楽天レシピランキングAPIへリクエスト
    $.getJSON(url, (data) => {
        const recipes = data.result;
        updateText(recipes);
    });

    const updateText = (data) => {
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            const insertHtml = `
            <li class="recipeItem">
                <p class="fish-tag">さかな料理レシピ</p>
                <p class="rank">${data[i].rank}位</p>
                <a href="${data[i].recipeUrl}" target="_blank">
                    <img src="${data[i].foodImageUrl}" alt="${data[i].recipeTitle} 画像">
                </a>
                <h2 class="recipeTitle">${data[i].recipeTitle}</h2>
                <p class="recipeDescription">${data[i].recipeDescription}</p>
                <p class="material"><材料><br>${data[i].recipeMaterial}</p>
                <p class="indication"><調理時間>${data[i].recipeIndication}</p>
                <p class="cost"><費用の目安>${data[i].recipeCost}</p>
            </li>
        `;
            console.log(insertHtml);
            $('#recipe_list').append(insertHtml);
        }
    }
})

$(".reset").on("click", function () {
    $(".recipeItem").remove();
    $("#fish-name").val("");
})


// キーダウン
$("button").on("keydown", function (e) {
    //既存のレシピ表示を削除
    if (e.keyCode === 13) {
        $(".recipeItem").remove();

        let y = $("#fish-name").val();

        let url = "";
        if (y === "サーモン" || y === "サケ" || y === "鮭" || y === "さけ") {
            url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-70";
        } else if (y === "いわし" || y === "イワシ" || y === "鰯") {
            url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-71";
        } else if (y === "さば" || y === "サバ" || y === "鯖") {
            url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-72";
        } else if (y === "あじ" || y === "アジ" || y === "鯵") {
            url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-73";
        } else if (y === "ぶり" || y === "ブリ" || y === "鰤") {
            url = "https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1037138608625946581&categoryId=11-74";
        }

        // 楽天レシピランキングAPIへリクエスト
        $.getJSON(url, (data) => {
            const recipes = data.result;
            updateText(recipes);
        });

        const updateText = (data) => {
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                const insertHtml = `
            <li class="recipeItem">
                <p class="fish-tag">さかな料理レシピ</p>
                <p class="rank">${data[i].rank}位</p>
                <a href="${data[i].recipeUrl}" target="_blank">
                    <img src="${data[i].foodImageUrl}" alt="${data[i].recipeTitle} 画像">
                </a>
                <h2 class="recipeTitle">${data[i].recipeTitle}</h2>
                <p class="recipeDescription">${data[i].recipeDescription}</p>
                <p class="material"><材料><br>${data[i].recipeMaterial}</p>
                <p class="indication"><調理時間>${data[i].recipeIndication}</p>
                <p class="cost"><費用の目安>${data[i].recipeCost}</p>
                
            </li>
        `;
                console.log(insertHtml);
                $('#recipe_list').append(insertHtml);
            }
        }
    }
})




// ホットペッパーからお店情報を取得
$(".restaurant").on("click", function () {
    $("#recipe_list").hide();
    //飲食店をAPIで検索
    // 現在の位置を取得
    function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // ホットペッパーAPIキーセット
        // let API_KEY = '38f4bc42aba3b5a1';

        let URL = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=38f4bc42aba3b5a1'

        // $.ajax({
        //     url: 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=38f4bc42aba3b5a1',
        //     type: 'GET',
        //     dataType: 'jsonp',
        //     jsonpCallback: 'callback'
        // }).done(function (data) {
        //     var dummy = data; // 成功時 この処理はダミーなので変更してください
        // }).fail(function (data) {
        //     var dummy = data; // 失敗時
        // });
        // + '&lat=33.590543&lng=130.420096&range=2&order=1&format=json'
        // http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=[APIキー]&lat=33.590543&lng=130.420096&range=2&order=1&format=json

        $.getJSON(URL, (data) => {
            const recipes = data.result;
            console.log(recipes);
            // updateText(recipes);
        });

        // const updateText = (data) => {
        //     console.log(data.length);
        //     for (let i = 0; i < data.length; i++) {
        //         const insertHtml = `
        //         <li class="recipeItem">
        //             <p class="rank">${data[i].rank}位</p>
        //             <a href="${data[i].recipeUrl}" target="_blank">
        //                 <img src="${data[i].foodImageUrl}" alt="${data[i].recipeTitle} 画像">
        //             </a>
        //             <h2 class="recipeTitle">${data[i].recipeTitle}</h2>
        //             <p class="recipeDescription">${data[i].recipeDescription}</p>
        //             <p class="material"><材料>${data[i].recipeMaterial}</p>
        //             <p class="indication"><調理時間>${data[i].recipeIndication}</p>
        //             <p class="cost"><費用の目安>${data[i].recipeCost}</p>
        //         </li>
        //     `;
        //         console.log(insertHtml);
        //         $('#recipe_list').append(insertHtml);
        //     }
        // }
    }

    function showError(error) {
        console.log(error);
        const errorMessage = [
            "位置情報が許可されていません",
            "現在位置を特定できません"
        ];
        alert(`error:${errorMessage[error.code - 1]}`);
    }

    const option = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000,
    };

    // geolocation.html

    navigator.geolocation.getCurrentPosition(showPosition, showError, option);

})


