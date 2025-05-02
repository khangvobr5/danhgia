// Khởi tạo biến toàn cục
let soLanDanhGia = 0;
let tongDiem = 0;
let danhGiaList = JSON.parse(localStorage.getItem('danhGiaList')) || [];

function hienThiDanhGia() {
    let danhGiaHTML = '';
    if (danhGiaList.length === 0) {
        danhGiaHTML = `
        <tr>
            <td colspan="3" class="text-center">Chưa có đánh giá nào.</td>
        </tr>`;
    } else {
        for (let i = 0; i < danhGiaList.length; i++) {
            danhGiaHTML += `
            <tr>
                <th class="id2" scope="row">${i + 1}</th>
                <td class="rating2">${danhGiaList[i].rating} <i class="fas fa-star"></i></td>
                <td>${danhGiaList[i].feedback}</td>
            </tr>`;
        }
    }
    document.querySelector('tbody').innerHTML = danhGiaHTML;
}

// Xử lý hiển thị phần ý kiến cải thiện
document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener("change", function () {
        const rating = parseInt(this.value);
        const improveSection = document.getElementById("improveSection");
        improveSection.style.display = rating < 5 ? "block" : "none";
    });
});

// Xử lý submit form
function hienThiDiemTrungBinh(event) {
    event.preventDefault();

    // Kiểm tra xem có đánh giá được chọn không
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        document.getElementById("feedback").innerHTML =
            `<div class="alert alert-warning">Vui lòng chọn số sao để đánh giá!</div>`;
        return;
    }

    const rating = parseInt(selectedRating.value);
    const improveInput = document.getElementById("improveInput").value;
    const feedback = document.getElementById("feedback");

    // Cập nhật điểm và số lần đánh giá
    soLanDanhGia++;
    tongDiem += rating;
    const danhGia = soLanDanhGia > 0 ? (tongDiem / soLanDanhGia).toFixed(1) : 0;

    // Lưu vào localStorage
    localStorage.setItem('tongDiem', tongDiem);
    localStorage.setItem('soLanDanhGia', soLanDanhGia);

    // Tạo thông báo
    let message = "";
    switch (rating) {
        case 5:
            message = `Cảm ơn quý khách đã đánh giá 5 sao!`;
            break;
        case 4:
            message = `Cảm ơn quý khách đã đánh giá 4 sao!`;
            break;
        case 3:
            message = `Cảm ơn quý khách đã đánh giá 3 sao.`;
            break;
        case 2:
            message = `Cảm ơn quý khách đã đánh giá 2 sao.`;
            break;
        case 1:
            message = `Cảm ơn quý khách đã đánh giá 1 sao.`;
            break;
    }

    if (rating < 5 && improveInput) {
        message += `<br>Ý kiến cải thiện: ${improveInput}`;
    }

    // Hiển thị thông báo
    feedback.innerHTML = `<div class="alert alert-success">${message}</div>`;
    document.getElementById("diemTB").innerHTML = `<div>${danhGia} trên 5 <span class="stars">★★★★★</span></div>`;

    // Reset form
    document.getElementById("ratingForm").reset();
    document.getElementById("improveSection").style.display = "none";

    // Thêm đánh giá vào danh sách
    danhGiaList.push({
        rating: rating,
        feedback: improveInput || "Không có ý kiến"
    });

    // Lưu danh sách đánh giá vào localStorage
    localStorage.setItem('danhGiaList', JSON.stringify(danhGiaList));

    // Cập nhật hiển thị danh sách đánh giá
    hienThiDanhGia();

    // Ghi log
    console.log(`Tổng điểm: ${tongDiem}, Số lần đánh giá: ${soLanDanhGia}, Điểm trung bình: ${danhGia}`);
}

// Xử lý khi tải trang
window.onload = function () {
    // Lấy dữ liệu từ localStorage
    tongDiem = parseInt(localStorage.getItem('tongDiem')) || 0;
    soLanDanhGia = parseInt(localStorage.getItem('soLanDanhGia')) || 0;
    const danhGia = soLanDanhGia > 0 ? (tongDiem / soLanDanhGia).toFixed(1) : 0;
    document.getElementById("diemTB").innerHTML = `<div>${danhGia} trên 5 <span class="stars">★★★★★</span></div>`;
    hienThiDanhGia();
}

// Xử lý nút "Tất Cả"
document.querySelector('.filter-btn').addEventListener('click', function () {
    hienThiDanhGia();
    alert('Hiển thị tất cả đánh giá!');
});