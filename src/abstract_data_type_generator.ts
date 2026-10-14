#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_abstract_data_type_generator_basic() {
        let mut gen_types = HashMap::<TypeId, Type>::new();
        
        // Test Gold value (74) and Egg value (3).
        assert_eq!(gen_types.get(&GoldType::GOLD.value()).unwrap(), Some(74));
        assert_eq!(gen_types.get(&EggType::EGG.value()).unwrap(), Some(3));

        let result = AbstractDataTypeGenerator::<TypeId>::generate_from_string("gold");
        assert_eq!(*result, 74);

        // Test Egg value directly.
        let result2 = AbstractDataTypeGenerator::<TypeId>::generate_from_string("egg");
        assert_eq!(*result2, 3);
    }

    #[test]
    fn test_abstract_data_type_generator_complex() {
        let mut gen_types = HashMap::<TypeId, Type>::new();
        
        // Test a custom type with non-standard values.
        assert_eq!(gen_types.get(&CustomType::CUSTOM.value()).unwrap(), Some(10));

        // Verify Golden Egg and Silver are distinct types that shouldn't map to eggs.
        let gold_result = AbstractDataTypeGenerator::<TypeId>::generate_from_string("gold");
        assert!(!is_egg(gold_result), "Gold should not be treated as an egg variant.");

        let silver_result = AbstractDataTypeGenerator::<TypeId>::generate_from_string("silver");
        assert!(!is_egg(silver_result), "Silver should not be treated as an egg variant.");
    }
}
