function permuteArray(inputArray) {
    const result = [];

    function permuteHelper(array, currentPermutation) {
        if (array.length === 0) {
            result.push([...currentPermutation]);
            return;
        }

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            currentPermutation.push(element);
            const remainingArray = array.filter((_, index) => index !== i);
            permuteHelper(remainingArray, currentPermutation);
            currentPermutation.pop();
        }
    }

    permuteHelper(inputArray, []);

    return result;
}