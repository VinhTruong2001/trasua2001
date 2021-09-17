export default function convertPrice(price) {
    if (price === 0) {
        return '0 Đ';
    } else {
        let priceString = price.toString();
        let pointIndex = priceString.length;
        do {
            pointIndex = pointIndex - 3;
            priceString = priceString.substring(0, pointIndex) + ',' + priceString.substring(pointIndex, priceString.length);
        } while (pointIndex > 3);
        return priceString  + 'đ';
    }
}