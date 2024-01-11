/* (C)2023 */
package com.adelium.web.authservice.entity;

import com.adelium.web.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.*;

/**
 * This class represents a user Address.
 * <p>
 *     The address has a street number, a street, an additional info, a city, a postal code, a country, a department number.
 *     It is associated with a user.
 * </p>
 * @see BaseEntity
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Address extends BaseEntity<Long> {

    @Column(nullable = false)
    private String streetNumber;

    @Column(nullable = false)
    private String street;

    @Column(nullable = true)
    private String additionalInfo;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String postalCode;

    @Column(nullable = false)
    private String country;

    @Column(nullable = true)
    private String departmentNumber;

    @OneToOne(mappedBy = "address")
    private User user;

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append(streetNumber).append(' ');
        sb.append(street).append('\'');
        if (additionalInfo != null) {
            sb.append(additionalInfo).append('\'');
        }
        sb.append(city).append(' ');
        sb.append(postalCode).append('\'');
        sb.append(country).append(' ');
        if (departmentNumber != null) {
            sb.append(departmentNumber);
        }
        return sb.toString();
    }
}
