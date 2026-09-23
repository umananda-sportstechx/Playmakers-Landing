/**
 * Terms of Membership.
 *
 * Extracted verbatim from sportstechx.com/playmakers/terms — the only copy of
 * this document until now. Structured rather than hand-written as JSX so the
 * markup and the typography live in one renderer, and a copy change stays a
 * data edit.
 */

export type LegalBlock =
  | { kind: 'p'; label?: string; text: string }
  | { kind: 'list'; items: { label?: string; text: string }[] };

export interface LegalSection {
  level: 2 | 3;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  /** The brand line above the title. */
  kicker?: string;
  /** Unheaded paragraphs that open the document, before section 1. */
  preamble: LegalBlock[];
  sections: LegalSection[];
}

export const termsOfMembership: LegalDoc = {
  title: 'Terms of Membership',
  kicker: 'PLAYMAKERS: SportsTech Founders Network',
  preamble: [
    { kind: 'p', text: 'These Terms of Membership (these "Terms") govern your participation as a member ("Member" or "you") in the Playmakers Sports Tech Founders Network ("Playmakers" or the "Network"), a private membership network operated by:' },
    { kind: 'p', label: 'SportsTechX GmbH', text: '' },
    { kind: 'p', text: 'Liebigstraße 35, 10247 Berlin' },
    { kind: 'p', text: 'HRB 215063 B, Amtsgericht Charlottenburg' },
    { kind: 'p', text: 'Represented by its Managing Director, Rohn Malhotra' },
    { kind: 'p', text: '("Provider", "we", "us", or "our")' },
    { kind: 'p', text: 'By agreeing to the Terms of Membership in your online membership application or membership onboarding, accessing or using Membership Services, or otherwise participating in Playmakers, you enter into a binding contract with the Provider and agree to comply with these Terms.' },
  ],
  sections: [
    {
      level: 2,
      heading: '1. Purpose and Scope of Membership',
      blocks: [
        { kind: 'p', text: 'The Provider operates Playmakers, a business network and advisory platform for accomplished sports technology founders and executives (the "Network").' },
        { kind: 'p', text: 'The purpose of the Membership is to grant the Member access to a trusted peer advisory community, curated networking opportunities, sports tech specific business intelligence and member-exclusive events and programming.' },
      ],
    },
    {
      level: 2,
      heading: '2. Membership Services',
      blocks: [
        { kind: 'p', text: 'During the active membership term, the Member receives access to the following services ("Membership Services"):' },
      ],
    },
    {
      level: 3,
      heading: '2.1 Core Group Advisory Sessions',
      blocks: [
        {
          kind: 'list',
          items: [
            { text: 'Placement in a curated core group of 6-9 accomplished sports tech founders' },
            { text: 'Nine (9) professionally facilitated core group sessions per membership year (approximately monthly)' },
            { text: 'Two-hour sessions with trained executive coaches/facilitators' },
            { text: 'Core group composition is determined by the Provider based on business model, geography, stage, expertise, and member preferences' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '2.2 Member Network and Introductions',
      blocks: [
        {
          kind: 'list',
          items: [
            { text: 'Access to the members-only directory featuring member profiles, expertise, and contact information' },
            { text: 'Ability to manage your member profile' },
            { text: 'Curated introductions to other members, investors, and key sports industry stakeholders facilitated by Playmakers leadership' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '2.3 Digital Community Platforms',
      blocks: [
        {
          kind: 'list',
          items: [
            { text: 'Access to Playmakers WhatsApp group for daily peer exchange and support' },
            { text: 'Access to online discussion boards and topic-specific channels' },
            { text: 'Real-time communication and knowledge sharing with fellow members' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '2.4 Member Events and Programming',
      blocks: [
        {
          kind: 'list',
          items: [
            { text: 'Invitations to member-exclusive events, workshops, dinners, and gatherings' },
            { text: 'Access to speaker series, educational programming, and expert sessions' },
            { text: 'Opportunities to attend curated sports industry conferences and events' },
            { text: 'Some events may require separate registration or have limited capacity' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '2.5 Sports Tech Business Intelligence',
      blocks: [
        {
          kind: 'list',
          items: [
            { text: 'Pro-level access to the SportsTechX Intelligence Hub' },
            { text: 'Access to proprietary sports tech market research, reports, and insights' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '2.6 Service Updates and Modifications',
      blocks: [
        { kind: 'p', text: 'The Provider may reasonably update, adjust, or enhance the Membership Services from time to time, provided the overall purpose and value of the membership are maintained. Members will be notified of material changes to Membership Services.' },
      ],
    },
    {
      level: 3,
      heading: '2.7 No Guarantee of Specific Outcomes',
      blocks: [
        { kind: 'p', text: 'While Playmakers provides access to valuable peer advisory, networking, and intelligence services, no guarantee is given for specific business introductions, outcomes, partnerships, investment, or other results. The value of membership depends significantly on each member\'s active participation and engagement.' },
      ],
    },
    {
      level: 2,
      heading: '3. Membership Eligibility and Application',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '3.1 Eligibility Criteria',
      blocks: [
        { kind: 'p', text: 'Playmakers membership is highly selective and limited to founders and executives of sports technology companies who meet one or more of the following criteria:' },
        {
          kind: 'list',
          items: [
            { text: 'Operating a business with €1M+ in annual revenue; OR' },
            { text: 'Built a business that has raised €3M+ in funding; OR' },
            { text: 'Repeat founder with a previous €5M+ company exit' },
          ],
        },
        { kind: 'p', text: 'In addition to meeting financial criteria, applicants are evaluated for:' },
        {
          kind: 'list',
          items: [
            { text: 'Commitment to contributing to the success of fellow members' },
            { text: 'Professional courtesy and cultural fit with Playmakers values' },
            { text: 'Diversity of entrepreneurial backgrounds and expertise' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '3.2 Application and Acceptance',
      blocks: [
        { kind: 'p', text: 'Membership to Playmakers is by application and invitation only. All applications are subject to review and approval by the Provider in its sole discretion. The Provider reserves the right to accept or decline any application for any reason or no reason. Acceptance of membership does not guarantee placement in any particular core group or access to specific individuals within the network.' },
      ],
    },
    {
      level: 3,
      heading: '3.3 Member Referrals',
      blocks: [
        { kind: 'p', text: 'Current members are encouraged to refer qualified candidates to Playmakers. All referrals are subject to the same application and review process. Members may only submit referrals for individuals from whom they have obtained permission to share contact information with Playmakers.' },
      ],
    },
    {
      level: 2,
      heading: '4. Membership Fee and Payment',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '4.1 Annual Membership Fee',
      blocks: [
        { kind: 'p', text: 'The annual Membership Fee is EUR 6,000 (plus applicable VAT).' },
      ],
    },
    {
      level: 3,
      heading: '4.2 Founding Member Discount',
      blocks: [
        { kind: 'p', text: 'For the first membership year, founding members receive a 50% discount, reducing the Fee to EUR 3,000 (plus applicable VAT). After the first year, the standard annual fee of EUR 6,000 (plus applicable VAT) applies. Founding members benefit from lifetime price protection at the standard rate in effect at the time of joining.' },
      ],
    },
    {
      level: 3,
      heading: '4.3 Billing and Payment Terms',
      blocks: [
        { kind: 'p', text: 'The Membership Fee is billed annually in advance. All payments are due immediately upon invoicing or according to the online checkout process. Members agree to pay all fees using a valid payment method (credit card, debit card, or other payment method accepted by the Provider). Payment processing is handled by third-party service providers (such as Qonto or Stripe), and Members agree to be bound by such providers\' terms of service and privacy policies.' },
      ],
    },
    {
      level: 3,
      heading: '4.4 Payment Authorization',
      blocks: [
        { kind: 'p', text: 'By providing payment information and accepting these Terms, you authorize the Provider to charge your designated payment method for all fees associated with your Membership, including membership renewal fees, unless you cancel in accordance with Section 5 below.' },
      ],
    },
    {
      level: 3,
      heading: '4.5 Failed Payments',
      blocks: [
        { kind: 'p', text: 'If payment fails or cannot be processed, the Provider reserves the right to suspend access to Membership Services until payment is received. Failure to pay the Membership Fee within thirty (30) days of the payment due date may result in immediate termination of membership without refund.' },
      ],
    },
    {
      level: 3,
      heading: '4.6 Non-Refundable Fees',
      blocks: [
        { kind: 'p', text: 'Fees are non-refundable except where required by law or as expressly provided in Section 5.3 below.' },
      ],
    },
    {
      level: 3,
      heading: '4.7 Fee Changes',
      blocks: [
        { kind: 'p', text: 'The Provider reserves the right to modify the Membership Fee for future membership terms. Members will be notified of fee changes at least sixty (60) days before the start of the next membership term. Continued membership after receiving notice of a fee change constitutes acceptance of the new fee. Members may cancel their membership prior to the renewal date to avoid the fee change.' },
      ],
    },
    {
      level: 2,
      heading: '5. Term and Renewal',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '5.1 Membership Commencement',
      blocks: [
        { kind: 'p', text: 'Membership begins upon Provider acceptance of the Member\'s online application or execution of this agreement.' },
      ],
    },
    {
      level: 3,
      heading: '5.2 Initial Term and Renewal',
      blocks: [
        { kind: 'p', text: 'The initial term is 12 months, commencing on the membership start date specified by the Provider. Membership automatically renews for further 12-month periods unless terminated with at least 30 days\' notice prior to the end of the current term.' },
      ],
    },
    {
      level: 3,
      heading: '5.3 Cancellation by Member',
      blocks: [
        { kind: 'p', text: 'Members may cancel their membership at any time by providing written notice to the Provider at least thirty (30) days prior to the renewal date. Cancellation requests must be submitted via email to rohn@sportstechx.com or the Playmakers website. If you cancel your membership, you may continue to use Membership Services until the end of your current membership term. No refunds will be provided for any portion of the membership fee for the current term, except where required by applicable law.' },
      ],
    },
    {
      level: 3,
      heading: '5.4 Membership Pauses',
      blocks: [
        { kind: 'p', text: 'The Provider may, in its sole discretion, allow members to pause their membership for a period of up to six (6) months per membership year in cases of extraordinary circumstances (such as extended illness, family leave, or temporary business disruption). Paused memberships do not automatically extend the membership term, and fees are not prorated during pauses. Members interested in pausing their membership should contact the Provider to discuss eligibility and terms.' },
      ],
    },
    {
      level: 3,
      heading: '5.5 Termination by Provider',
      blocks: [
        { kind: 'p', text: 'The Provider reserves the right to suspend or terminate a Member\'s access to Membership Services immediately and without refund in cases of:' },
        {
          kind: 'list',
          items: [
            { text: 'Material breach of these Terms, the Code of Conduct, or the Confidentiality Pledge' },
            { text: 'Repeated or grossly disruptive behavior' },
            { text: 'Abuse of confidential information or violation of the Confidentiality Pledge' },
            { text: 'Misuse of the Network or its resources for improper purposes' },
            { text: 'Conduct that materially harms other members, the Provider, or the Network\'s reputation' },
            { text: 'Failure to pay membership fees when due' },
            { text: 'Provision of false or misleading information during application or membership' },
          ],
        },
        { kind: 'p', text: 'Such termination will typically be preceded by a warning, unless immediate action is required to prevent harm to the Network, other members, or the Provider. The right to extraordinary termination for good cause under German law (§ 314 BGB) remains unaffected.' },
      ],
    },
    {
      level: 3,
      heading: '5.6 Effect of Termination',
      blocks: [
        { kind: 'p', text: 'Access to Membership Services ends on the last day of the membership term. Upon termination or expiration of membership, the Member must immediately cease using all Membership Services, including access to member directories, community platforms, and proprietary content. The Member\'s obligations under the Confidentiality Pledge and any intellectual property restrictions survive termination indefinitely.' },
      ],
    },
    {
      level: 2,
      heading: '6. Member Responsibilities',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '6.1 General Obligations',
      blocks: [
        { kind: 'p', text: 'The Member agrees to:' },
        {
          kind: 'list',
          items: [
            { text: 'Provide accurate and complete information during his or her application and in all subsequent communications and interactions with the Provider and other Members' },
            { text: 'Make a reasonable and good-faith effort to participate in core group sessions and actively engage with the Playmakers community' },
            { text: 'Use the Membership Services only for legitimate internal business purposes and personal professional development' },
            { text: 'Behave professionally, respectfully, and constructively in all Network interactions' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '6.2 Compliance with Governing Documents',
      blocks: [
        { kind: 'p', text: 'All members must comply with the Playmakers Code of Conduct and Playmakers Confidentiality Pledge, which are incorporated into these Terms by reference and form an integral part of the membership agreement. Violations of the Code of Conduct or Confidentiality Pledge constitute a material breach of these Terms.' },
      ],
    },
    {
      level: 3,
      heading: '6.3 Core Group Participation',
      blocks: [
        { kind: 'p', text: 'Regular and engaged participation in core group sessions is essential to the value of Playmakers. Members are expected to attend core group sessions consistently, arrive on time, be fully present and engaged, honor the confidentiality of discussions, and provide constructive feedback and support to fellow core group members. If members are unable to attend a scheduled core group session, they are expected to notify their core group facilitator at least 24 hours in advance. Chronic absence or disengagement may result in removal from the core group or termination of membership.' },
      ],
    },
    {
      level: 3,
      heading: '6.4 Account Security',
      blocks: [
        { kind: 'p', text: 'Members are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. Members must immediately notify the Provider of any unauthorized use of their account or any other security breach.' },
      ],
    },
    {
      level: 2,
      heading: '7. Confidentiality',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '7.1 Confidentiality Pledge',
      blocks: [
        { kind: 'p', text: 'Confidentiality is governed by the Playmakers Confidentiality Pledge, which all members must sign and honor. The Confidentiality Pledge is incorporated into these Terms by reference.' },
      ],
    },
    {
      level: 3,
      heading: '7.2 Business Confidentiality',
      blocks: [
        { kind: 'p', text: 'In addition to member-to-member confidentiality obligations, both the Provider and Member must treat all non-public information disclosed in connection with the membership relationship as confidential. This includes business strategies, member data, proprietary methodologies, and any information designated as confidential.' },
      ],
    },
    {
      level: 3,
      heading: '7.3 Exceptions',
      blocks: [
        { kind: 'p', text: 'Confidential information may only be used internally and for the purpose of the Membership. These Confidentiality obligations do not apply to information that is public, independently developed, or lawfully obtained.' },
      ],
    },
    {
      level: 3,
      heading: '7.4 Duration',
      blocks: [
        { kind: 'p', text: 'Confidentiality obligations continue indefinitely after membership ends.' },
      ],
    },
    {
      level: 2,
      heading: '8. Data Protection',
      blocks: [
        { kind: 'p', text: 'The Provider processes personal data in accordance with GDPR and applicable German data protection laws.' },
        { kind: 'p', text: 'The Provider\'s privacy policy, available on the Provider\'s website (Privacy Policy), governs the collection, use, and protection of member personal data.' },
        { kind: 'p', text: 'Members acknowledge that their profile information (including name, company, role, expertise, and contact information) will be visible to other Playmakers members through the member directory.' },
      ],
    },
    {
      level: 2,
      heading: '9. Intellectual Property',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '9.1 Provider\'s Intellectual Property',
      blocks: [
        { kind: 'p', text: 'All content, data, materials, reports, methodologies, curricula, tools, and resources provided by the Provider remain the exclusive property of the Provider or respective rights holders.' },
      ],
    },
    {
      level: 3,
      heading: '9.2 Limited License',
      blocks: [
        { kind: 'p', text: 'The Member receives a non-exclusive, non-transferable, internal-use-only license for the duration of the membership to access and use Membership Services and content. This license terminates upon expiration or termination of membership.' },
      ],
    },
    {
      level: 3,
      heading: '9.3 Usage Restrictions',
      blocks: [
        { kind: 'p', text: 'Redistribution, publication, or sharing outside the Member\'s organization requires prior written approval. Members may not:' },
        {
          kind: 'list',
          items: [
            { text: 'Copy, reproduce, distribute, or create derivative works from Provider content' },
            { text: 'Use Provider trademarks, logos, or branding without written permission' },
            { text: 'Scrape, extract, or systematically collect member data from Playmakers platforms' },
            { text: 'Record core group sessions, events, or conversations without explicit consent from all participants' },
          ],
        },
      ],
    },
    {
      level: 3,
      heading: '9.4 Member Content',
      blocks: [
        { kind: 'p', text: 'Members retain ownership of content they create and share within Playmakers (such as discussion posts, feedback, and contributions). By sharing content within Playmakers, members grant the Provider a non-exclusive, worldwide license to use, reproduce, and display such content solely for the purpose of operating and improving the Network. The Provider will not use member content for external marketing or commercial purposes without explicit permission.' },
      ],
    },
    {
      level: 3,
      heading: '9.5 Feedback and Suggestions',
      blocks: [
        { kind: 'p', text: 'Any feedback, suggestions, or ideas provided by members regarding Playmakers services may be used by the Provider without obligation or compensation to the member.' },
      ],
    },
    {
      level: 2,
      heading: '10. Member Warranties and Representations',
      blocks: [
        { kind: 'p', text: 'Members warrant and represent that:' },
        {
          kind: 'list',
          items: [
            { text: 'They are legally capable of entering into this agreement and have full authority to bind themselves (and their company, if applicable) to these Terms' },
            { text: 'All information provided during application and throughout membership is truthful, accurate, and complete' },
            { text: 'They meet the eligibility criteria for Playmakers membership' },
            { text: 'Their participation in Playmakers will not violate any applicable laws, regulations, or contractual obligations' },
            { text: 'They will maintain the accuracy of all information provided and promptly update any material changes' },
            { text: 'They will comply with all governing documents, including these Terms, the Code of Conduct, and the Confidentiality Pledge' },
          ],
        },
      ],
    },
    {
      level: 2,
      heading: '11. Liability',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '11.1 Provider Disclaimer',
      blocks: [
        { kind: 'p', text: 'MEMBERSHIP SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PROVIDER DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE PROVIDER DOES NOT WARRANT THAT MEMBERSHIP SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.' },
      ],
    },
    {
      level: 3,
      heading: '11.2 Liability for Intent and Gross Negligence',
      blocks: [
        { kind: 'p', text: 'The Provider is liable for intent and gross negligence.' },
      ],
    },
    {
      level: 3,
      heading: '11.3 Limited Liability for Simple Negligence',
      blocks: [
        { kind: 'p', text: 'For simple negligence, liability is limited to damages to life, body, health, and to essential contractual obligations (Kardinalpflichten). For breaches of essential contractual obligations, liability is limited to foreseeable, typical damages.' },
      ],
    },
    {
      level: 3,
      heading: '11.4 Exclusion of Indirect Damages',
      blocks: [
        { kind: 'p', text: 'Liability is excluded for indirect damages, consequential damages, and lost profits, except in cases of intent or gross negligence.' },
      ],
    },
    {
      level: 3,
      heading: '11.5 Member Responsibility',
      blocks: [
        { kind: 'p', text: 'Members acknowledge that they participate in core group discussions and networking activities at their own discretion and judgment. The Provider is not responsible for advice, recommendations, or interactions between members. Members should evaluate all information and advice received through Playmakers and make independent decisions appropriate for their circumstances.' },
      ],
    },
    {
      level: 3,
      heading: '11.6 Third-Party Content and Services',
      blocks: [
        { kind: 'p', text: 'Playmakers may incorporate or provide access to third-party content, services, speakers, or facilitators. The Provider is not responsible for the accuracy, quality, or legality of third-party content or services. Use of third-party services is subject to such third parties\' terms and policies.' },
      ],
    },
    {
      level: 3,
      heading: '11.7 Cap on Liability',
      blocks: [
        { kind: 'p', text: 'To the extent permitted by law, the Provider\'s total aggregate liability for any claims arising from or related to these Terms or the Membership Services shall not exceed the total membership fees paid by the Member in the twelve (12) months preceding the claim.' },
      ],
    },
    {
      level: 3,
      heading: '11.8 Mandatory Statutory Liability',
      blocks: [
        { kind: 'p', text: 'Mandatory statutory liability rules remain unaffected.' },
      ],
    },
    {
      level: 2,
      heading: '12. Amendments to These Terms',
      blocks: [
        { kind: 'p', text: 'The Provider may update these Terms for valid reasons (e.g., legal changes, product updates, security requirements, or operational necessity). Members will be informed of any material amendments or updates of the Terms at least thirty (30) days in advance via email or through the member portal.' },
        { kind: 'p', text: 'Continued use of the Membership Services after changes become effective constitutes acceptance of the updated Terms. If a member does not agree to material changes, they may cancel their membership in accordance with Section 5.3, and will receive a pro-rated refund of any prepaid fees for the remainder of the term if the changes materially reduce the value or scope of Membership Services.' },
      ],
    },
    {
      level: 2,
      heading: '13. Governing Law and Dispute Resolution',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '13.1 Governing Law',
      blocks: [
        { kind: 'p', text: 'These Terms are governed by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods (CISG).' },
      ],
    },
    {
      level: 3,
      heading: '13.2 Dispute Resolution',
      blocks: [
        { kind: 'p', text: '13.2.1 Any dispute, controversy or claim arising out of, relating to or in connection with this contract, including any question regarding its existence, validity or termination, shall be finally resolved under the Rules of Arbitration of the International Chamber of Commerce. The seat of arbitration will be Zurich, Switzerland.' },
        { kind: 'p', text: '13.2.2 The language of the arbitration shall be English. The number of arbitrators shall be one. The decision and award of the arbitrator will be delivered within three (3) months of his or her appointment, unless otherwise agreed between the parties, and will be final and binding on the Parties and enforceable in any court of competent jurisdiction. Nothing in this section prevents or restricts either party from seeking specific performance, injunctive relief or any other form of equitable remedy.' },
        { kind: 'p', text: '13.2.3 The costs of the arbitration, including administrative and arbitrators\' fees, will be shared equally by the parties and each party will bear its own costs and attorneys\' and witness\' fees incurred in connection with the arbitration unless the arbitrator determines that it is equitable to allocate such costs and fees differently and so orders in rendering judgment.' },
      ],
    },
    {
      level: 2,
      heading: '14. Miscellaneous Provisions',
      blocks: [
      ],
    },
    {
      level: 3,
      heading: '14.1 Entire Agreement',
      blocks: [
        { kind: 'p', text: 'These Terms, together with the Playmakers Code of Conduct, Playmakers Confidentiality Pledge, and Privacy Policy, constitute the entire agreement between the Member and the Provider regarding Playmakers membership and supersede all prior agreements, understandings, or communications.' },
      ],
    },
    {
      level: 3,
      heading: '14.2 Severability',
      blocks: [
        { kind: 'p', text: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely approximates the intent and economic effect of the original provision.' },
      ],
    },
    {
      level: 3,
      heading: '14.3 No Waiver',
      blocks: [
        { kind: 'p', text: 'The Provider\'s failure to enforce any provision of these Terms does not constitute a waiver of that provision or the right to enforce it in the future. Any waiver must be in writing and signed by an authorized representative of the Provider.' },
      ],
    },
    {
      level: 3,
      heading: '14.4 Assignment',
      blocks: [
        { kind: 'p', text: 'Members may not assign, transfer, or delegate their rights or obligations under these Terms without the Provider\'s prior written consent. The Provider may assign these Terms in connection with a merger, acquisition, sale of assets, or other business transaction.' },
      ],
    },
    {
      level: 3,
      heading: '14.5 Electronic Communications',
      blocks: [
        { kind: 'p', text: 'By accepting these Terms, members consent to receive electronic communications from the Provider, including via email, member portal notifications, or WhatsApp. These electronic communications satisfy any legal requirement for written notices. Members may update their communication preferences through their account settings but acknowledge that certain essential communications (such as billing notices and material policy changes) cannot be opted out of.' },
      ],
    },
    {
      level: 3,
      heading: '14.6 Force Majeure',
      blocks: [
        { kind: 'p', text: 'Neither party shall be liable for failure to perform its obligations under these Terms due to causes beyond its reasonable control, including acts of God, war, terrorism, pandemic, government restrictions, or other force majeure events. If a force majeure event prevents the Provider from delivering Membership Services for more than sixty (60) days, either party may terminate the membership, and the Provider will refund a pro-rated portion of prepaid fees for services not delivered.' },
      ],
    },
    {
      level: 3,
      heading: '14.7 Language',
      blocks: [
        { kind: 'p', text: 'These Terms may be provided in multiple languages for convenience. In case of any discrepancy between language versions, the English version shall prevail, except where local law requires otherwise.' },
      ],
    },
    {
      level: 2,
      heading: '15. Contact',
      blocks: [
        { kind: 'p', label: 'SportsTechX GmbH', text: '' },
        { kind: 'p', text: 'Liebigstraße 35, 10247 Berlin' },
        { kind: 'p', label: 'Email:', text: 'rohn@sportstechx.com' },
        { kind: 'p', text: 'Last updated: December 2025' },
      ],
    },
  ],
};
