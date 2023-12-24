export const convertToBase64 = (e) => {
    const files = e.target.files;

    return Promise.all(
        Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        })
    );
};


export const revenue = (payments) => {
    const totalSuccessfulAmount = payments
        .filter(payment => payment.paymentStatus === 'success')
        .reduce((sum, payment) => sum + +payment.amount, 0);

    const formattedAmount = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(totalSuccessfulAmount);

    return formattedAmount;
}