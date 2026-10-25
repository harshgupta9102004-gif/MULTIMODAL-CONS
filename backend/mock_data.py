"""
Sample demonstration data for the Multimodal Construction Intelligence Platform.
Used when GEMINI_API_KEY is not supplied or during API rate limits / network outages.
"""

PRELIMINARY_DISCLAIMER = (
    "PRELIMINARY AI ASSESSMENT ONLY: This computer-vision and LLM evaluation is based solely on visible 2D "
    "pixel data. It cannot detect subsurface stress, soil subsidence, internal rebar corrosion, or hidden structural "
    "flaws. This does not replace a physical on-site audit by a licensed structural engineer or certified safety officer."
)

DEMO_SAFETY_ANALYSIS = {
    "summary": "Visual analysis identified partial PPE compliance with critical perimeter fall hazards and unprotected electrical runs.",
    "risk_level": "High",
    "safety_score": 68,
    "findings": [
        "2 workers observed without high-visibility reflective vests near active heavy machinery.",
        "Scaffolding edge at elevation (> 2.4m) lacks required intermediate guardrails and toe-boards (OSHA 1926.451 / IS 456).",
        "Temporary electrical distribution cabling exposed across pedestrian pathway without protective cable ramps.",
        "Hard hats observed on 3 out of 4 visible crew members; 1 worker wearing soft cap."
    ],
    "recommendations": [
        "Immediately halt work at elevated scaffold bay until standard top-rail and mid-rail guardrails are anchored.",
        "Issue mandatory PPE restock for high-vis class 2 vests and enforce mandatory hard-hat zone compliance.",
        "Elevate or bridge temporary electrical cables with heavy-duty crossover ramps to prevent trip hazards and insulation wear.",
        "Conduct a 10-minute pre-shift Toolbox Talk focusing on elevation fall arrest and PPE compliance."
    ],
    "ppe_compliance": [
        {"item": "Safety Helmets (Hard Hats)", "status": "Partial", "compliance_rate": "75%"},
        {"item": "High-Visibility Vests", "status": "Non-Compliant", "compliance_rate": "50%"},
        {"item": "Steel-Toe Safety Boots", "status": "Compliant", "compliance_rate": "100%"},
        {"item": "Fall Protection Harnesses", "status": "Non-Compliant", "compliance_rate": "0% (At Elevation)"}
    ],
    "hazards": [
        {"hazard": "Unprotected Scaffold Edge", "severity": "Critical", "remedy": "Install OSHA-spec toe-boards and dual guardrails"},
        {"hazard": "Exposed Power Cables", "severity": "High", "remedy": "Reroute overhead or apply yellow protective cable raceways"},
        {"hazard": "Missing High-Vis Gear", "severity": "Medium", "remedy": "Strict gate inspection and supply high-vis apparel"}
    ],
    "standards_referenced": ["OSHA 1926 Safety & Health Regulations for Construction", "IS 456:2000 Code of Practice for Plain and Reinforced Concrete"],
    "demo_mode": True,
    "disclaimer": PRELIMINARY_DISCLAIMER
}

DEMO_CRACK_ANALYSIS = {
    "summary": "Visible diagonal shear crack observed across load-bearing masonry/reinforced concrete junction with concrete spalling.",
    "risk_level": "High",
    "defect_type": "Structural Shear / Settlement",
    "estimated_width_mm": "3.5 mm - 4.2 mm",
    "urgency": "High - Requires Structural Engineer Inspection within 48 Hours",
    "findings": [
        "Continuous diagonal fracture pattern extending at roughly 45 degrees, typical of differential settlement or shear stress.",
        "Localized surface spalling and minor micro-flaking along fracture margins indicating active stress concentration.",
        "Crack width exceeds the allowable limit of 0.3 mm for exterior exposed reinforced concrete under IS 456 / ACI 224R.",
        "Dampness discoloration detected near fracture line, suggesting possible water ingress into rebar plane."
    ],
    "recommendations": [
        "Install optical tell-tale crack motion monitors or glass calibrated pins across the fracture to verify active widening.",
        "Perform non-destructive Ultrasonic Pulse Velocity (UPV) or rebound hammer test to measure internal concrete integrity.",
        "Clean fracture cavity and execute low-viscosity structural epoxy injection (or polyurethane grout if water ingress is active).",
        "Engage a certified structural engineer to review foundation soil condition and check column load transfer before cosmetic plastering."
    ],
    "root_causes": [
        "Differential foundation settlement or uneven subgrade compaction.",
        "Shear strain exceeding tensile capacity of concrete section.",
        "Thermal expansion cycles exacerbated by seasonal moisture fluctuations."
    ],
    "recommended_repairs": [
        "Pressure epoxy injection (ASTM C881 Type I/IV)",
        "Carbon-fiber reinforced polymer (CFRP) wrapping if structural load capacity is compromised",
        "Waterproof elastomeric barrier application post-repair"
    ],
    "demo_mode": True,
    "disclaimer": PRELIMINARY_DISCLAIMER
}

def generate_demo_project_plan(project_type: str, budget: float, duration_months: int, location: str = ""):
    monthly_budget = round(budget / max(1, duration_months), 2)
    return {
        "summary": f"Comprehensive construction execution plan formulated for a {project_type} project budgeted at ₹{budget:,.2f} Lakhs across a {duration_months}-month schedule.",
        "risk_level": "Medium",
        "project_type": project_type,
        "total_budget": budget,
        "duration_months": duration_months,
        "monthly_burn_rate": monthly_budget,
        "findings": [
            f"Project scope falls within standard {project_type} risk profiles; material price volatility is the primary financial vulnerability.",
            f"Target schedule of {duration_months} months requires concurrent procurement of long-lead items (TMT steel, cement grade 53).",
            "Monsoon and extreme seasonal weather buffers must be incorporated into sub-structure excavation phases."
        ],
        "recommendations": [
            "Lock in vendor framework agreements for steel reinforcement and RMC (Ready-Mix Concrete) in Phase 1.",
            "Implement a weekly Critical Path Method (CPM) tracking review with 14-day lookahead schedules.",
            "Establish on-site material testing protocol (slump test, cube compressive strength at 7 & 28 days).",
            "Mandate digital daily site progress logging and bi-weekly safety compliance audits."
        ],
        "phases": [
            {
                "phase": "Phase 1: Pre-Construction & Substructure",
                "duration": f"Months 1 - {max(1, round(duration_months * 0.25))}",
                "percentage_budget": "25%",
                "budget_allocation": round(budget * 0.25, 2),
                "key_tasks": ["Site clearance & soil testing", "Excavation & PCC foundation", "Footing & plinth beam casting"]
            },
            {
                "phase": "Phase 2: Superstructure & Reinforced Frame",
                "duration": f"Months {max(1, round(duration_months * 0.25)) + 1} - {max(2, round(duration_months * 0.65))}",
                "percentage_budget": "40%",
                "budget_allocation": round(budget * 0.40, 2),
                "key_tasks": ["RCC columns & slab formwork", "Reinforcement steel tying", "Slab casting & 21-day curing protocol"]
            },
            {
                "phase": "Phase 3: MEP & Masonry Infill",
                "duration": f"Months {max(2, round(duration_months * 0.65)) + 1} - {max(3, round(duration_months * 0.85))}",
                "percentage_budget": "20%",
                "budget_allocation": round(budget * 0.20, 2),
                "key_tasks": ["AAC block/brick masonry", "Electrical conduit and plumbing rough-ins", "Internal & external plastering"]
            },
            {
                "phase": "Phase 4: Finishes, Handover & Commissioning",
                "duration": f"Months {max(3, round(duration_months * 0.85)) + 1} - {duration_months}",
                "percentage_budget": "15%",
                "budget_allocation": round(budget * 0.15, 2),
                "key_tasks": ["Flooring, painting & fixture installation", "Snagging audit & QA testing", "Occupancy certificate & client handover"]
            }
        ],
        "material_estimates": {
            "cement_bags": round(budget * 18.5),
            "steel_metric_tonnes": round(budget * 0.42, 1),
            "sand_aggregates_cft": round(budget * 48.0)
        },
        "demo_mode": True,
        "disclaimer": PRELIMINARY_DISCLAIMER
    }

def generate_demo_assistant_response(query: str):
    q_lower = query.lower()
    if "safety" in q_lower or "ppe" in q_lower or "hazard" in q_lower:
        return {
            "summary": "OSHA & IS 456 Site Safety and PPE Protocols",
            "risk_level": "Medium",
            "response": (
                "For active construction environments, safety compliance begins with mandatory Five-Point PPE: "
                "Class 2/3 high-visibility vests, hard hats conforming to ANSI Z89.1 / IS 2925, steel-toe puncture-resistant boots, "
                "safety eyewear, and protective cut-resistant gloves. For work at elevations above 1.8 meters (6 feet), standard "
                "guardrails, toe-boards, or 100% tie-off dual lanyards with full-body harnesses (EN 361) are mandatory. "
                "Always conduct daily morning Toolbox Talks before heavy equipment starts."
            ),
            "findings": [
                "Elevated fall hazards represent the single highest cause of construction site fatalities.",
                "Toolbox talks and pre-task safety checklists reduce incident rates by over 45%."
            ],
            "recommendations": [
                "Enforce strict gate check for PPE prior to entering active operational zones.",
                "Conduct daily visual inspection of wire ropes, harnesses, and scaffold couplings.",
                "Maintain dedicated clear walkways separated from crane and backhoe transit paths."
            ],
            "demo_mode": True,
            "disclaimer": PRELIMINARY_DISCLAIMER
        }
    elif "crack" in q_lower or "concrete" in q_lower or "curing" in q_lower:
        return {
            "summary": "Concrete Quality, Crack Diagnostics & Curing Protocol",
            "risk_level": "Low",
            "response": (
                "Concrete crack assessment distinguishes between non-structural micro-cracks (plastic shrinkage, hairline drying cracks <0.3mm) "
                "and structural stress cracks (diagonal shear, settlement fractures >1.0mm). Proper concrete curing is essential: moist curing "
                "must be maintained for a minimum of 7 to 14 days under IS 456 (or 21 days with mineral admixtures like fly ash/GGBS). "
                "For cracks wider than 0.3mm subject to water penetration, pressure epoxy or polyurethane injection is the standard restorative action."
            ),
            "findings": [
                "Premature drying or wind exposure during the first 6 hours causes rapid plastic shrinkage cracking.",
                "Water-cement ratio exceeding 0.45 significantly degrades compressive strength and durability."
            ],
            "recommendations": [
                "Use wet hessian bags or ponding method for continuous hydration curing.",
                "Monitor any existing cracks using optical crack gauges over 30 days to check stability.",
                "Consult a structural engineer if cracks appear adjacent to column-beam beam joints."
            ],
            "demo_mode": True,
            "disclaimer": PRELIMINARY_DISCLAIMER
        }
    else:
        return {
            "summary": "Engineering Decision-Support Advisory",
            "risk_level": "Low",
            "response": (
                f"Regarding '{query}': In modern construction project engineering, best practice emphasizes integrated digital planning, "
                "rigorous QA/QC testing, material tracking, and proactive hazard mitigation. Maintain strict alignment with national building codes "
                "(such as National Building Code / IS 456 / ACI 318) and keep daily digital logs of weather, material batches, labor presence, "
                "and structural milestone inspections."
            ),
            "findings": [
                "Systematic documentation provides audit trails and prevents costly rework during contractor milestone sign-offs.",
                "Weather monitoring prevents pouring concrete during high thermal volatility or excessive rainfall."
            ],
            "recommendations": [
                "Verify standard compliance test certificates (MTC) for all reinforcing steel batches.",
                "Schedule progressive third-party structural testing at critical frame milestones.",
                "Ensure emergency response and evacuation pathways remain unblocked at all times."
            ],
            "demo_mode": True,
            "disclaimer": PRELIMINARY_DISCLAIMER
        }
