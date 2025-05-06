fn main(image_hash: Field, predicted_class: u8, public_expected_class: u8) {
    assert(predicted_class == public_expected_class);
}

#[test]
fn test_main() {
    main(1, 2);
    // Uncomment to make test fail
    // main(1, 1);
}
