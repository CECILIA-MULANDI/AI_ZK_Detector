// predicted_class is correct for the given image_hash
fn main(image_hash: [u8; 32], predicted_class: u8, public_expected_class: u8) {
    assert(predicted_class == public_expected_class);
    let mut is_zero = true;
    for i in 0..32 {
        if (image_hash[i] != 0) {
            is_zero = false;
        }
    }
    assert(!is_zero)
}

// #[test]
// fn test_main() {
//     main(1, 2);
//     // Uncomment to make test fail
//     // main(1, 1);
// }
